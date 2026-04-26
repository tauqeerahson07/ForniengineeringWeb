from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from django.utils.text import slugify
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