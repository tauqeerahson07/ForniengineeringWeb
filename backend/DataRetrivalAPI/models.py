from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from django.utils.text import slugify
import os
from django.dispatch import receiver
from django.db.models.signals import post_delete
import boto3
from dotenv import load_dotenv
from supabase import create_client
load_dotenv()

bucket_name = os.getenv("BUCKET")
SUPABASE_URL = os.getenv("SUPABASE_STORAGRE").split("/storage")[0]  # Remove "/storage" from the endpoint
SUPABASE_KEY = os.getenv("ANNON_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
# Create your models here.
# helper functions

def furnaces_upload_path(instance, filename):
    safe_name = slugify(instance.name)
    name, ext = os.path.splitext(filename)
    safe_filename = slugify(name) + ext
    return f'furnaces/{safe_name}/{safe_filename}'

def additional_furnace_image_path(instance, filename):
    safe_name = slugify(instance.product.name)
    name, ext = os.path.splitext(filename)
    safe_filename = slugify(name) + ext
    return f'furnaces/{safe_name}/gallery/{safe_filename}'

def services_upload_path(instance, filename):
    safe_name = slugify(instance.name)
    name, ext = os.path.splitext(filename)
    safe_filename = slugify(name) + ext
    return f'services/{safe_name}/{safe_filename}'

def additional_service_image_path(instance, filename):
    safe_name = slugify(instance.service.name)
    name, ext = os.path.splitext(filename)
    safe_filename = slugify(name) + ext
    return f'services/{safe_name}/gallery/{safe_filename}'

class Furnaces(models.Model):
    f_id = models.AutoField(primary_key=True, unique=True)
    cover_image = models.FileField(upload_to=furnaces_upload_path)
    name = models.CharField(max_length=1000)
    # feature= CKEditor5Field("Text", config_name="default")
    feature = models.TextField()
    # specification = CKEditor5Field("Text", config_name="default")
    specification = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.cover_image.url if self.cover_image else 'No Image'})"
    
    def delete(self, *args, **kwargs):
        if self.name:
            folder_path = f"furnaces/{self.name}/"
            response = supabase.storage.from_(bucket_name).remove([folder_path])
        super().delete(*args, **kwargs)
        
class FurnaceImages(models.Model):
    image_id = models.AutoField(primary_key=True, unique=True)
    product = models.ForeignKey(Furnaces, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.FileField(upload_to=additional_furnace_image_path)

    def __str__(self):
        return f"Image for {self.product.name}"
    
class Services(models.Model):
    s_id = models.AutoField(primary_key=True, unique=True)
    cover_image = models.FileField(upload_to=services_upload_path)
    name = models.TextField()
    # description= CKEditor5Field("Text", config_name="default")
    description = models.TextField()    
    def __str__(self):
        return f"{self.name} ({self.cover_image.url if self.cover_image else 'No Image'})"
    

class ServiceImages(models.Model):
    image_id = models.AutoField(primary_key=True, unique=True)
    service = models.ForeignKey(Services, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.FileField(upload_to=additional_service_image_path)

    def __str__(self):
        return f"Image for {self.service.name}"
