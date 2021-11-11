from django.urls import path
from .views import index

app_name = 'frontend'
#must add url patterns for pages
urlpatterns = [
    path('', index, name=''),
    path('info', index),
    path('JRP', index),
    path('CRP', index),
    path('room/<str:roomCode>', index)
]
