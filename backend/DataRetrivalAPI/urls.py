from django.urls import path
from . import views

urlpatterns = [
    path('furnaces/',views.furnaces,  name='furnaces'),
    path('furnaces/<str:name>/',views.SearchFindFurnace, name = 'Search'),
]
