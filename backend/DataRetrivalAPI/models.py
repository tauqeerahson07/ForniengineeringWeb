from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from django.utils.text import slugify
import os
from dotenv import load_dotenv
import boto3

load_dotenv()

s3 = boto3.client(
    service_name='s3',
    endpoint_url=os.getenv("R2_S3_ENDPOINT_URL"),
    # Provide your R2 Access Key ID and Secret Access Key
    aws_access_key_id=os.getenv("R2_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("R2_SECRET_ACCESS_KEY"),
    region_name='auto',  # Required by boto3, not used by R2
)


# # Download a file
# s3.download_file('my-bucket', 'myfile.txt', 'downloaded.txt')
# print('Downloaded to downloaded.txt')

# # List objects
# response = s3.list_objects_v2(Bucket='my-bucket')
# for obj in response.get('Contents', []):
#     print(f"Object: {obj['Key']}")

# Upload path functions
def furnaces_upload_path(instance, filename):
    safe_name = slugify(instance.name)
    name, ext = os.path.splitext(filename)
    safe_filename = slugify(name) + ext
    # Upload a file
    s3.upload_file(filename, os.getenv("BUCKET"), f'furnaces/{safe_name}/{safe_filename}')
    return f'furnaces/{safe_name}/{safe_filename}'

def additional_furnace_image_path(instance, filename):
    safe_name = slugify(instance.product.name)
    name, ext = os.path.splitext(filename)
    safe_filename = slugify(name) + ext
    s3.upload_file(filename, os.getenv("BUCKET"), f'furnaces/{safe_name}/{safe_filename}')
    return f'furnaces/{safe_name}/gallery/{safe_filename}'

def services_upload_path(instance, filename):
    safe_name = slugify(instance.name)
    name, ext = os.path.splitext(filename)
    safe_filename = slugify(name) + ext
    s3.upload_file(filename, os.getenv("BUCKET"), f'furnaces/{safe_name}/{safe_filename}')
    return f'services/{safe_name}/{safe_filename}'

def additional_service_image_path(instance, filename):
    safe_name = slugify(instance.service.name)
    name, ext = os.path.splitext(filename)
    safe_filename = slugify(name) + ext
    s3.upload_file(filename, os.getenv("BUCKET"), f'services/{safe_name}/gallery/{safe_filename}')
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