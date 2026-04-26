from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from django.utils.text import slugify
from django.db.models.signals import pre_delete,pre_save
from django.dispatch import receiver
import os
from dotenv import load_dotenv

load_dotenv()

# Upload path functions
def furnaces_upload_path(instance, filename):
    safe_name = slugify(instance.name)
    name, ext = filename.rsplit('.', 1) if '.' in filename else (filename, '')
    safe_filename = slugify(name) + ('.' + ext if ext else '')
    return f'furnaces/{safe_name}/{safe_filename}'


def additional_furnace_image_path(instance, filename):
    safe_name = slugify(instance.product.name)
    name, ext = filename.rsplit('.', 1) if '.' in filename else (filename, '')
    safe_filename = slugify(name) + ('.' + ext if ext else '')
    return f'furnaces/{safe_name}/gallery/{safe_filename}'


def services_upload_path(instance, filename):
    safe_name = slugify(instance.name)
    name, ext = filename.rsplit('.', 1) if '.' in filename else (filename, '')
    safe_filename = slugify(name) + ('.' + ext if ext else '')
    return f'services/{safe_name}/{safe_filename}'


def additional_service_image_path(instance, filename):
    safe_name = slugify(instance.service.name)
    name, ext = filename.rsplit('.', 1) if '.' in filename else (filename, '')
    safe_filename = slugify(name) + ('.' + ext if ext else '')
    return f'services/{safe_name}/gallery/{safe_filename}'

class Furnaces(models.Model):
    f_id = models.AutoField(primary_key=True, unique=True)
    cover_image = models.FileField(upload_to=furnaces_upload_path)
    name = models.CharField(max_length=1000)
    feature = models.TextField()
    specification = models.TextField()

    def __str__(self):
        return f"{self.name}"

class FurnaceImages(models.Model):
    image_id = models.AutoField(primary_key=True, unique=True)
    image = models.FileField(upload_to=additional_furnace_image_path)
    product = models.ForeignKey(Furnaces, on_delete=models.CASCADE, related_name='gallery_images')

    def __str__(self):
        return f"Image for {self.product.name}"

class Services(models.Model):
    s_id = models.AutoField(primary_key=True, unique=True)
    cover_image = models.FileField(upload_to=services_upload_path)
    name = models.TextField()
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"

class ServiceImages(models.Model):
    image_id = models.AutoField(primary_key=True, unique=True)
    image = models.FileField(upload_to=additional_service_image_path)
    service = models.ForeignKey(Services, on_delete=models.CASCADE, related_name='gallery_images')

    def __str__(self):
        return f"Image for {self.service.name}"

# Signal handlers to delete old images when replaced or instance deleted
@receiver(pre_save, sender=Furnaces)
def delete_old_furnace_cover_image(sender, instance, **kwargs):
    if instance.f_id:
        try:
            old_instance = Furnaces.objects.get(f_id=instance.f_id)
            if old_instance.cover_image and old_instance.cover_image != instance.cover_image:
                old_instance.cover_image.delete(save=False)
        except Furnaces.DoesNotExist:
            pass

@receiver(pre_save, sender=FurnaceImages)
def delete_old_furnace_gallery_image(sender, instance, **kwargs):
    if instance.image_id:
        try:
            old_instance = FurnaceImages.objects.get(image_id=instance.image_id)
            if old_instance.image and old_instance.image != instance.image:
                old_instance.image.delete(save=False)
        except FurnaceImages.DoesNotExist:
            pass

@receiver(pre_save, sender=Services)
def delete_old_service_cover_image(sender, instance, **kwargs):
    if instance.s_id:
        try:
            old_instance = Services.objects.get(s_id=instance.s_id)
            if old_instance.cover_image and old_instance.cover_image != instance.cover_image:
                old_instance.cover_image.delete(save=False)
        except Services.DoesNotExist:
            pass

@receiver(pre_save, sender=ServiceImages)
def delete_old_service_gallery_image(sender, instance, **kwargs):
    if instance.image_id:
        try:
            old_instance = ServiceImages.objects.get(image_id=instance.image_id)
            if old_instance.image and old_instance.image != instance.image:
                old_instance.image.delete(save=False)
        except ServiceImages.DoesNotExist:
            pass

@receiver(pre_delete, sender=Furnaces)
def delete_furnace_cover_image(sender, instance, **kwargs):
    if instance.cover_image:
        instance.cover_image.delete(save=False)

@receiver(pre_delete, sender=FurnaceImages)
def delete_furnace_gallery_image(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)

@receiver(pre_delete, sender=Services)
def delete_service_cover_image(sender, instance, **kwargs):
    if instance.cover_image:
        instance.cover_image.delete(save=False)

@receiver(pre_delete, sender=ServiceImages)
def delete_service_gallery_image(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)