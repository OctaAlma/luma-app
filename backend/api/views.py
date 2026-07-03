from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Student, Payment, Package
from .serializer import PaymentSerializer, StudentSerializer, PackageSerializer

# Create your views here.

@api_view(['GET'])
def get_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
def get_student_payments(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = PaymentSerializer(student.payments.all(), many=True)
    return Response(serializer.data)

@api_view(["PUT", "GET", "DELETE"])
def student_detail(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_payments(request):
    payments = Payment.objects.all()
    serializer = PaymentSerializer(payments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_payment(request):
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

@api_view(["PUT", "GET", "DELETE"])
def payment_detail(request, pk):
    try:
        payment = Payment.objects.get(pk=pk)
    except Payment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PaymentSerializer(payment)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = PaymentSerializer(payment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        payment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


@api_view(['GET'])
def get_packages(request):
    packages = Package.objects.all()
    serializer = PackageSerializer(packages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_package(request):
    serializer = PackageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

@api_view(["PUT", "GET", "DELETE"])
def package_detail(request, pk):
    try:
        package = Package.objects.get(pk=pk)
    except Payment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PackageSerializer(package)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = PackageSerializer(package, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        package.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)