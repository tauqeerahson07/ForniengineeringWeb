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

    class Meta:
        model = Furnaces
        fields = '__all__'  # Include all fields, or specify the fields explicitly

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

    class Meta:
        model = Services
        fields = '__all__'  # Include all fields, or specify the fields explicitly

    def get_cover_image(self, obj):
        # Extract the relative path from the full URL
        if obj.cover_image:
            return obj.cover_image.name  # Returns the relative path (e.g., "services/.../image.jpg")
        return None