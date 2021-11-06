from django.urls import path
from .views import index

#must add url patterns for pages
urlpatterns = [
    path('', index),
    path('JRP', index),
    path('CRP', index),
    path('room/<str:roomCode>', index)
]
