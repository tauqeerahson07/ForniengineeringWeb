from rest_framework import serializers
from .models import Furnaces,FurnaceImages,Services,ServiceImages

# Serializer for the gallery images
class FurnaceImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FurnaceImages
        fields = ['image_id', 'image']


class FurnacesSerializer(serializers.ModelSerializer):
    # Override the cover_image field to return only the relative path
    cover_image = serializers.SerializerMethodField()
    images = FurnaceImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Furnaces
        fields = ['id', 'name', 'feature', 'specification', 'cover_image', 'images']

    def get_cover_image(self, obj):
        # Extract the relative path from the full URL
        if obj.cover_image:
            return obj.cover_image.name  # Returns the relative path (e.g., "furnaces/.../image.jpg")
        return None



# Serializer for the gallery images
class ServiceImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceImages
        fields = ['image_id', 'image']


class ServiceSerializer(serializers.ModelSerializer):
    # Override the cover_image field to return only the relative path
    cover_image = serializers.SerializerMethodField()
    images = ServiceImagesSerializer(many=True, read_only=True)

    class Meta:
        model = Services
        fields = ['id', 'name', 'description', 'cover_image', 'images']

    def get_cover_image(self, obj):
        # Extract the relative path from the full URL
        if obj.cover_image:
            return obj.cover_image.name  # Returns the relative path (e.g., "services/.../image.jpg")
        return None