from django.shortcuts import render
from rest_framework import generics
from .serializer import dbModelSerializer
from .models import dbModel

class dbModelView(generics.ListAPIView):
    queryset = dbModel.objects.all()
    serializer_class = dbModelSerializer