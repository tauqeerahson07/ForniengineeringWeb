from django.urls import path
from . import views

urlpatterns = [
    path('furnaces/',views.furnaces,  name='furnaces'),
    path('furnaces/<str:name>/',views.SearchFindFurnace, name = 'Search'),
    path('services/',views.services,  name='services'),
    path('services/<str:name>/',views.SearchFindServices, name = 'Search'),
]
