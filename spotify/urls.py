from django.urls import path
from .views import *

#must add url patterns for pages
urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', Authenticated.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('pause', PauseSong.as_view()),
    path('play', PlaySong.as_view()),
]
