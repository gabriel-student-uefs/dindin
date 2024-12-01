from rest_framework import generics, permissions, response, status
from django.db import models
from .models import FinancialGoal, Transaction
from .serializers import FinancialGoalSerializer, TransactionSerializer

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
        serializer.save(user=self.request.user)

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