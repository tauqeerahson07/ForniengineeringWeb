from django.db import models
from django.utils.text import slugify
import os
from django.dispatch import receiver
from django.db.models.signals import post_delete
import boto3
from dotenv import load_dotenv
load_dotenv()

bucket_name = os.getenv("BUCKET")
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
    feature= models.CharField(max_length=1000)   
    specification =models.TextField(max_length=2000)
    
    def __str__(self):
        return f"{self.name} ({self.cover_image.url if self.cover_image else 'No Image'})"

class FurnaceImages(models.Model):
    image_id = models.AutoField(primary_key=True, unique=True)
    product = models.ForeignKey(Furnaces, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.FileField(upload_to=additional_furnace_image_path)

    def __str__(self):
        return f"Image for {self.product.name}"
    
class Services(models.Model):
    s_id = models.AutoField(primary_key=True, unique=True)
    cover_image = models.FileField(upload_to=services_upload_path)
    name = models.CharField(max_length=1000)
    description= models.TextField(max_length=1000)   
    
    def __str__(self):
        return f"{self.name} ({self.cover_image.url if self.cover_image else 'No Image'})"

class ServiceImages(models.Model):
    image_id = models.AutoField(primary_key=True, unique=True)
    service = models.ForeignKey(Services, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.FileField(upload_to=additional_service_image_path)

    def __str__(self):
        return f"Image for {self.service.name}"

# Signal to delete images from S3 when a FurnaceImages instance is deleted
@receiver(post_delete, sender=FurnaceImages)
def delete_furnace_image_from_s3(sender, instance, **kwargs):
    if instance.image:
        s3 = boto3.client('s3')
        s3.delete_object(Bucket=bucket_name, Key=instance.image.name)

# Signal to delete the cover image from S3 when a Furnaces instance is deleted
@receiver(post_delete, sender=Furnaces)
def delete_furnace_cover_image_from_s3(sender, instance, **kwargs):
    if instance.cover_image:
        s3 = boto3.client('s3')
        s3.delete_object(Bucket=bucket_name, Key=instance.cover_image.name)

# Signal to delete images from S3 when a ServiceImages instance is deleted
@receiver(post_delete, sender=ServiceImages)
def delete_service_image_from_s3(sender, instance, **kwargs):
    if instance.image:
        s3 = boto3.client('s3')
        s3.delete_object(Bucket=bucket_name, Key=instance.image.name)

# Signal to delete the cover image from S3 when a Services instance is deleted
@receiver(post_delete, sender=Services)
def delete_service_cover_image_from_s3(sender, instance, **kwargs):
    if instance.cover_image:
        s3 = boto3.client('s3')
        s3.delete_object(Bucket=bucket_name, Key=instance.cover_image.name)

