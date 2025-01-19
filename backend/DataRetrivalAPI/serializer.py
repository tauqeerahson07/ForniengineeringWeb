from rest_framework import serializers
from .models import Furnaces

class FurnacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Furnaces
        fields = ['image', 'name', 'feature', 'specification']