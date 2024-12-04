from rest_framework import generics, permissions, response, status, views
from django.db import models
from .models import FinancialGoal, Transaction
from authentication.models import User
from .serializers import FinancialGoalSerializer, TransactionSerializer, UserSerializer

class FinancialGoalListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = FinancialGoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FinancialGoal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FinancialGoalDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FinancialGoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FinancialGoal.objects.filter(user=self.request.user)

class TransactionListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        transaction = serializer.save(user=self.request.user)
        user = self.request.user
        user.add_xp(50)
        user.save()


class TransactionDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
    

class UserTotalAmountAPIView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        incomes = Transaction.objects.filter(user=user, type='income').aggregate(total=models.Sum('amount'))['total'] or 0
        expenses = Transaction.objects.filter(user=user, type='expense').aggregate(total=models.Sum('amount'))['total'] or 0
        total_amount = incomes - expenses
        return response.Response({'total_amount': total_amount}, status=status.HTTP_200_OK)
    
class UserRankingAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        users = User.objects.all().order_by('-level', '-xp')
        serialized_users = []
        for index, user in enumerate(users):
            user_data = UserSerializer(user).data
            user_data['ranking'] = index + 1
            serialized_users.append(user_data)
        return response.Response(serialized_users, status=status.HTTP_200_OK)


class IndividualRankingAPIView(views.APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        users = User.objects.all().order_by('-level', '-xp')
        user = request.user
        user_ranking = list(users).index(user) + 1
        serializer = UserSerializer(user)
        return response.Response({
            'user': serializer.data,
            'ranking': user_ranking
        }, status=status.HTTP_200_OK)