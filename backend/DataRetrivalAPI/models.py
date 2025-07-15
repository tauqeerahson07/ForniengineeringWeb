from django.db import models
# Create your models here.
# helper functions
def furnaces_upload_path(instance, filename):
    # Customize the upload path as needed
    return f'furnaces/{instance.name}/{filename}'

def additional_furnace_image_path(instance, filename):
    return f'furnaces/{instance.product.name}/{filename}/gallery'

def services_upload_path(instance, filename):
    # Customize the upload path as needed
    return f'services/{instance.name}/{filename}'

def additional_service_image_path(instance, filename):
    return f'services/{instance.product.name}/{filename}/gallery'

class Furnaces(models.Model):
    f_id = models.AutoField(primary_key=True, unique=True)
    cover_image = models.FileField(upload_to=furnaces_upload_path)
    name = models.CharField(max_length=1000)
    feature= models.CharField(max_length=1000)   
    specification =models.CharField(max_length=1000)
    
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
    description= models.CharField(max_length=1000)   
    
    def __str__(self):
        return self.name + self.image

class ServiceImages(models.Model):
    image_id = models.AutoField(primary_key=True, unique=True)
    product = models.ForeignKey(Services, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.FileField(upload_to=additional_service_image_path)

    def __str__(self):
        return f"Image for {self.product.name}"

# class customer(models.Model):
#     id = models.AutoField(primary_key=True, unique=True)
#     name = models.CharField(max_length=1000)
#     email = models.EmailField(max_length=1000)
#     country = models.CharField(max_length=1000)
#     password = models.CharField(max_length=8)
#     query_id = models.ForeignKey('Query', on_delete=models.PROTECT)                            
    
#     def __str__(self):
#         return "name : " + self.name + "\n" + "email : " + self.email
    
# class Query(models.Model):
#     q_id = models.AutoField(primary_key=True, unique=True)
#     q_furnace_id = models.ForeignKey(Furnaces, on_delete=models.PROTECT)
#     q_service_id = models.ForeignKey(Services, on_delete=models.PROTECT)
#     q_customer_id = models.ForeignKey(customer, on_delete=models.PROTECT)
    
#     def __str__(self):
#         return "query_id : " + self.q_id + "\n" + "furnace_id : " + self.q_furnace_id + "\n" + "service_id : " + self.q_service_id + "\n" + "customer_id : " + self.q_customer_id
    

