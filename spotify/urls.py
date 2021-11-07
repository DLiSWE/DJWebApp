from django.urls import path
from .views import AuthURL, spotify_callback, Authenticated

#must add url patterns for pages
urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', Authenticated.as_view()),
]
