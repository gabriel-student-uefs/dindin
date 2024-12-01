from rest_framework import serializers
from .models import FinancialGoal, Transaction

class FinancialGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialGoal
        fields = ['id', 'name', 'target_amount', 'current_amount', 'deadline', 'frequency', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'type', 'category', 'amount', 'date', 'description', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)