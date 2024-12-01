from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):
    
    def create_user(self, username, email, password=None):
        
        if username is None:
            raise TypeError('Users should have a username')
        if email is None:
            raise TypeError('Users should have a Email')
        
        user=self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, email, password=None):
        if password is None:
            raise TypeError('Password should not be none')
        
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True, db_index=True)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    is_verified =  models.BooleanField(default=False)
    is_active =  models.BooleanField(default=True)
    is_staff =  models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    #Fields for gamification
    xp = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects=UserManager()
    
    def __str__(self):
        return self.email
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
    
    def add_xp(self, amount):
        self.xp += amount
        self.check_level_up()

    def check_level_up(self):
        level_up_xp = self.calculate_level_up_xp()
        while self.xp >= level_up_xp:
            self.level += 1
            self.xp -= level_up_xp
            level_up_xp = self.calculate_level_up_xp()

    def calculate_level_up_xp(self):
        # required XP increases by 50% each level
        return 100 * (1.5 ** (self.level - 1))
    
    def xp_for_next_level(self):
        return self.calculate_level_up_xp() - self.xp