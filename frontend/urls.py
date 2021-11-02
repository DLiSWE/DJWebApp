from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('JRP', index),
    path('CRP', index),
    path('room/<str:roomCode>', index)
]
