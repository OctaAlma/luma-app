from django.urls import path
from .views import *

urlpatterns = [
    path('students/', get_students, name='get_students'),
    path('students/create/', create_student, name='create_student'),
    path('students/<int:pk>/', student_detail, name='student_detail'),
    path('students/payments/<int:pk>/', get_student_payments, name='get_student_payments'),
    
    path('payments/', get_payments, name='get_payment'),
    path('payments/create/', create_payment, name='create_payment'),
    path('payments/<int:pk>/', payment_detail, name="payment_detail"),

    path('packages/', get_packages, name='get_package'),
    path('packages/create/', create_package, name='create_package'),
    path('packages/<int:pk>/', package_detail, name="package_detail")
]