from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Furnaces

# Create your views here.
@api_view(['GET'])
def furnaces(request):
    furnaces = Furnaces.objects.all()
    return Response(furnaces)