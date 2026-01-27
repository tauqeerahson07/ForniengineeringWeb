from django.contrib import admin
from .models import Furnaces, Services,FurnaceImages,ServiceImages
from django.utils.text import slugify
import os
from supabase import create_client
from dotenv import load_dotenv
load_dotenv()


bucket_name = os.getenv("BUCKET")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SERVICE_ROLE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Helper function to delete folder from Supabase Storage
def delete_supabase_folder(bucket, prefix):
    try:
        stack = [prefix]

        while stack:
            current = stack.pop()
            items = supabase.storage.from_(bucket).list(current)

            files_to_delete = []

            for item in items:
                name = item["name"]
                full_path = f"{current}/{name}"

                if item.get("metadata"):  # file
                    files_to_delete.append(full_path)
                else:  # folder
                    stack.append(full_path)

            if files_to_delete:
                supabase.storage.from_(bucket).remove(files_to_delete)

    except Exception as e:
        print("Supabase recursive delete error:", e)


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
    
    # def delete_model(self, request, obj):
    #     folder_path = f"furnaces/{slugify(obj.name)}"
    #     delete_supabase_folder(bucket_name, folder_path)
    #     super().delete_model(request, obj)


    def delete_queryset(self, request, queryset):
        for obj in queryset:
            folder_path = f"furnaces/{slugify(obj.name)}"
            delete_supabase_folder(bucket_name, folder_path)
        super().delete_queryset(request, queryset)



class ServiceImageInline(admin.TabularInline):
    model = ServiceImages
    extra = 1

class ServicesAdmin(admin.ModelAdmin):
    inlines = [ServiceImageInline]
    list_display = ('name','s_id')
    
    def delete_model(self, request, obj):
        folder_path = f"services/{slugify(obj.name)}"
        delete_supabase_folder(bucket_name, folder_path)
        super().delete_model(request, obj)


    def delete_queryset(self, request, queryset):
        for obj in queryset:
            folder_path = f"services/{slugify(obj.name)}"
            delete_supabase_folder(bucket_name, folder_path)
        super().delete_queryset(request, queryset)


admin.site.register(Furnaces,FurnacesAdmin)
admin.site.register(Services,ServicesAdmin)