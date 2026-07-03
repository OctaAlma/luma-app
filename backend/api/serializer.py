from rest_framework import serializers
from .models import Payment, Student, Package

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = [
            'id',
            'email',
            'phone',
            'firstName',
            'lastName',
            'payments'
        ]

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'