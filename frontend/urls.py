from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('ExamplePage1', index),
    path('ExamplePage2', index)
]
