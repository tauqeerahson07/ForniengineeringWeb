from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Furnaces,Services
from .serializer import FurnacesSerializer,ServiceSerializer
from rest_framework import status
# Create your views here.

@api_view(['GET'])
def furnaces(request):
    furnaces = Furnaces.objects.all()
    serializer = FurnacesSerializer(furnaces, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def SearchFindFurnace(request, name):
    # Filter furnaces by the name (URL parameter)
    furnaces = Furnaces.objects.filter(name__icontains=name).all()
    print(furnaces.query)
    if furnaces.exists():
        # Serialize the filtered queryset
        serializer = FurnacesSerializer(furnaces, many=True)
        return Response(serializer.data)
    else:
        # Return a 404 response if no furnaces are found
        return Response(
            {"error": f"No furnaces found containing the name '{name}'."},
            status=status.HTTP_404_NOT_FOUND
        )
@api_view(['GET'])
def services(request):
    services = Services.objects.all()
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def SearchFindServices(request, name):
    # Filter furnaces by the name (URL parameter)
    services = Services.objects.filter(name__icontains=name).all()
    print(services.query)
    if services.exists():
        # Serialize the filtered queryset
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
    else:
        # Return a 404 response if no furnaces are found
        return Response(
            {"error": f"No services found containing the name '{name}'."},
            status=status.HTTP_404_NOT_FOUND
        )