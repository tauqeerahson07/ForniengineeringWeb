from django.urls import path
from . import views

urlpatterns = [
    path('furnaces/',views.furnaces,  name='furnaces'),
    path('furnaces/<str:name>/',views.SearchFindFurnace, name = 'Search'),
    path('services/',views.services,  name='services'),
    path('services/<str:name>/',views.SearchFindServices, name = 'Search'),
    path('spare-parts/',views.spare_parts,  name='spare_parts'),
    path('spare-parts/<str:name>/',views.SearchFindSpareParts, name = 'Search'),
]
