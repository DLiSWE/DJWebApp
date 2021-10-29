from django.db import models
import string
import random

# Create your models here.
def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choises(string.ascii_uppercase, k=length))
        if dbModel.objects.filter(code=code).count() == 0:
            break

    return code

class dbModel(models.Model):
    field1 = models.CharField(max_length=8, default="", unique=True)
    field2 = models.CharField(max_length=50, unique=True)
    blfield3 = models.BooleanField(null=False, default=False)
    intfield = models.IntegerField(null=False,default=0)
    datefield = models.DateTimeField(auto_now_add=True)
