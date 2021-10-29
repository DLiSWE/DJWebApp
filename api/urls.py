from django.urls import path
from .views import dbModelView

urlpatterns = [
    path('home', dbModelView.as_view()),
]
