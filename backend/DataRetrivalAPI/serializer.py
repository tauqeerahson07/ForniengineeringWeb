from rest_framework import serializers
from .models import Furnaces,FurnaceImages,Services,ServiceImages

# Serializer for the gallery images
class FurnaceImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FurnaceImages
        fields = ['image_id', 'image']


class FurnacesSerializer(serializers.ModelSerializer):
    gallery_images = FurnaceImagesSerializer(many=True, read_only=True)
    class Meta:
        model = Furnaces
        fields = ['cover_image', 'name', 'feature', 'specification','gallery_images']
        
# Serializer for the gallery images
class ServiceImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceImages
        fields = ['image_id', 'image']


class ServiceSerializer(serializers.ModelSerializer):
    gallery_images = ServiceImagesSerializer(many=True, read_only=True)
    class Meta:
        model = Services
        fields = ['cover_image', 'name','description','gallery_images']
        