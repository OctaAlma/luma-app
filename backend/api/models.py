from django.db import models

# Create your models here.
class Student(models.Model):
    email = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=100, blank=True)
    firstName = models.CharField(max_length=100, blank=True)
    lastName = models.CharField(max_length=100, blank=True)
    
class Payment(models.Model):
    postDate = models.DateTimeField()
    startDate = models.DateTimeField()
    monthlyPrice = models.DecimalField(max_digits=8, decimal_places=2)
    duration = models.IntegerField()
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='payments'
    )

class Package(models.Model):
    planName = models.CharField(max_length=100)
    monthlyPrice = models.DecimalField(max_digits=8, decimal_places=2)
    duration = models.IntegerField()