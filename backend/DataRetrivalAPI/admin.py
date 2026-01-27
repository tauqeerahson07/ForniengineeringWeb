from django.contrib import admin
from .models import Furnaces, Services,FurnaceImages,ServiceImages
from django.utils.text import slugify
import os
from supabase import create_client
from dotenv import load_dotenv
load_dotenv()


bucket_name = os.getenv("BUCKET")
SUPABASE_URL = os.getenv("SUPABASE_STORAGRE").split("/storage")[0]
SUPABASE_KEY = os.getenv("SERVICE_ROLE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Register your models here.
# Inline class to handle gallery images
class ImagesInline(admin.TabularInline):  # You can also use admin.StackedInline for a vertical layout
    model = FurnaceImages
    extra = 1  # Show one extra blank image field
    # You can also add 'fields = ('image',)' if you want to customize fields shown

# Custom admin for Furnaces to include gallery images
class FurnacesAdmin(admin.ModelAdmin):
    inlines = [ImagesInline]
    list_display = ('name', 'f_id')  # Optional: show more fields in list view
    
    def delete_model(self, request, obj):
        folder_path = f"furnaces/{slugify(obj.name)}"

        try:
            supabase.storage.from_(bucket_name).remove([folder_path])
        except Exception as e:
            print(f"Supabase delete error: {e}")

        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            folder_path = f"furnaces/{slugify(obj.name)}"
            try:
                supabase.storage.from_(bucket_name).remove([folder_path])
            except Exception as e:
                print(f"Supabase delete error: {e}")

        super().delete_queryset(request, queryset)


class ServiceImageInline(admin.TabularInline):
    model = ServiceImages
    extra = 1

class ServicesAdmin(admin.ModelAdmin):
    inlines = [ServiceImageInline]
    list_display = ('name','s_id')
    
    def delete_model(self, request, obj):
        folder_path = f"services/{slugify(obj.name)}"

        try:
            supabase.storage.from_(bucket_name).remove([folder_path])
        except Exception as e:
            print(f"Supabase delete error: {e}")

        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            folder_path = f"services/{slugify(obj.name)}"
            try:
                supabase.storage.from_(bucket_name).remove([folder_path])
            except Exception as e:
                print(f"Supabase delete error: {e}")

        super().delete_queryset(request, queryset)

admin.site.register(Furnaces,FurnacesAdmin)
admin.site.register(Services,ServicesAdmin)