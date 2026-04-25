from rest_framework import serializers
from .models import Furnaces, Services, FurnaceImages, ServiceImages
from django.conf import settings

class FurnaceImagesSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            if settings.DEBUG:
                return obj.image.url
            return obj.image.url  # R2 will provide signed URLs via Django storage
        return None

    class Meta:
        model = FurnaceImages
        fields = ['image_id', 'image']

class FurnacesSerializer(serializers.ModelSerializer):
    gallery_images = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()

    def get_cover_image(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None

    def get_gallery_images(self, obj):
        images = obj.gallery_images.all()
        return [img.image.url for img in images if img.image]

    class Meta:
        model = Furnaces
        fields = ['name', 'feature', 'specification', 'cover_image', 'gallery_images']

class ServiceImagesSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None

    class Meta:
        model = ServiceImages
        fields = ['image_id', 'image']

class ServiceSerializer(serializers.ModelSerializer):
    gallery_images = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()

    def get_cover_image(self, obj):
        if obj.cover_image:
            return obj.cover_image.url
        return None

    def get_gallery_images(self, obj):
        images = obj.gallery_images.all()
        return [img.image.url for img in images if img.image]

    class Meta:
        model = Services
        fields = ['name', 'description', 'cover_image', 'gallery_images']