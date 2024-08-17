from django.urls import path
from . import views

urlpatterns = [
    path('furnaces/',views.furnaces)
]
