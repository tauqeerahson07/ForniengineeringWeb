from django.contrib import admin
from .models import Furnaces, Services, FurnaceImages, ServiceImages
from django.utils.text import slugify
import os
import boto3
from dotenv import load_dotenv

load_dotenv()

bucket_name = os.getenv("BUCKET")
AWS_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY")
AWS_S3_ENDPOINT_URL = os.getenv("R2_S3_ENDPOINT_URL")

# Initialize S3 client for R2
s3_client = boto3.client(
    "s3",
    endpoint_url=AWS_S3_ENDPOINT_URL,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name="auto",
)


# ---------- helpers ----------
def _normalize_bucket_path(path_or_field):
    """Normalize to bucket-relative path like 'furnaces/slug/file.jpg'"""
    if not path_or_field:
        return None
    name = getattr(path_or_field, "name", None) or str(path_or_field)
    name = name.lstrip("/")
    if bucket_name and name.startswith(f"{bucket_name}/"):
        name = name[len(bucket_name) + 1 :]
    return name or None


def _remove_r2_object(path_or_field):
    """Remove single object from R2 bucket."""
    if not bucket_name:
        return
    path = _normalize_bucket_path(path_or_field)
    if not path:
        return
    try:
        s3_client.delete_object(Bucket=bucket_name, Key=path)
        print(f"Removed from R2: {path}")
    except Exception as e:
        print("R2 remove error:", e, path)


def delete_r2_folder(prefix):
    """Recursively delete all objects under prefix in R2."""
    if not bucket_name:
        return
    try:
        normalized_prefix = _normalize_bucket_path(prefix)
        if not normalized_prefix:
            return
        if not normalized_prefix.endswith("/"):
            normalized_prefix += "/"

        # list all objects under prefix
        response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=normalized_prefix)
        if "Contents" not in response:
            return

        # delete all objects
        delete_keys = [{"Key": obj["Key"]} for obj in response["Contents"]]
        if delete_keys:
            s3_client.delete_objects(Bucket=bucket_name, Delete={"Objects": delete_keys})
            print(f"Deleted {len(delete_keys)} objects under {normalized_prefix}")
    except Exception as e:
        print("R2 recursive delete error:", e)
# ---------- end helpers ----------


# Inline classes
class ImagesInline(admin.TabularInline):
    model = FurnaceImages
    extra = 1


class ServiceImageInline(admin.TabularInline):
    model = ServiceImages
    extra = 1


# Furnaces admin
class FurnacesAdmin(admin.ModelAdmin):
    inlines = [ImagesInline]
    list_display = ("name", "f_id")

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            folder_path = f"furnaces/{slugify(obj.name)}"
            delete_r2_folder(folder_path)
        super().delete_queryset(request, queryset)

    def save_model(self, request, obj, form, change):
        """Detect and remove old cover image on change."""
        old_path = None
        if change and obj.pk:
            try:
                old_obj = Furnaces.objects.get(pk=obj.pk)
                old_path = _normalize_bucket_path(getattr(old_obj, "cover_image", None))
            except Furnaces.DoesNotExist:
                old_path = None

        super().save_model(request, obj, form, change)

        new_path = _normalize_bucket_path(getattr(obj, "cover_image", None))
        if old_path and old_path != new_path:
            _remove_r2_object(old_path)

    def save_formset(self, request, form, formset, change):
        """Detect and remove old/deleted gallery images in inlines."""
        paths_to_remove = set()

        for inline_form in formset.forms:
            if not hasattr(inline_form, "cleaned_data"):
                continue
            cleaned = inline_form.cleaned_data
            if cleaned.get("DELETE", False) and inline_form.instance.pk:
                paths_to_remove.add(_normalize_bucket_path(getattr(inline_form.instance, "image", None)))
                continue
            if inline_form.instance.pk and "image" in getattr(inline_form, "changed_data", []):
                try:
                    old = inline_form._meta.model.objects.get(pk=inline_form.instance.pk)
                    paths_to_remove.add(_normalize_bucket_path(getattr(old, "image", None)))
                except Exception:
                    pass

        super().save_formset(request, form, formset, change)

        for p in filter(None, paths_to_remove):
            _remove_r2_object(p)


# Services admin
class ServicesAdmin(admin.ModelAdmin):
    inlines = [ServiceImageInline]
    list_display = ("name", "s_id")

    def delete_model(self, request, obj):
        folder_path = f"services/{slugify(obj.name)}"
        delete_r2_folder(folder_path)
        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            folder_path = f"services/{slugify(obj.name)}"
            delete_r2_folder(folder_path)
        super().delete_queryset(request, queryset)

    def save_model(self, request, obj, form, change):
        """Detect and remove old cover image on change."""
        old_path = None
        if change and obj.pk:
            try:
                old_obj = Services.objects.get(pk=obj.pk)
                old_path = _normalize_bucket_path(getattr(old_obj, "cover_image", None))
            except Services.DoesNotExist:
                old_path = None

        super().save_model(request, obj, form, change)

        new_path = _normalize_bucket_path(getattr(obj, "cover_image", None))
        if old_path and old_path != new_path:
            _remove_r2_object(old_path)

    def save_formset(self, request, form, formset, change):
        """Detect and remove old/deleted gallery images in inlines."""
        paths_to_remove = set()

        for inline_form in formset.forms:
            if not hasattr(inline_form, "cleaned_data"):
                continue
            cleaned = inline_form.cleaned_data
            if cleaned.get("DELETE", False) and inline_form.instance.pk:
                paths_to_remove.add(_normalize_bucket_path(getattr(inline_form.instance, "image", None)))
                continue
            if inline_form.instance.pk and "image" in getattr(inline_form, "changed_data", []):
                try:
                    old = inline_form._meta.model.objects.get(pk=inline_form.instance.pk)
                    paths_to_remove.add(_normalize_bucket_path(getattr(old, "image", None)))
                except Exception:
                    pass

        super().save_formset(request, form, formset, change)

        for p in filter(None, paths_to_remove):
            _remove_r2_object(p)


admin.site.register(Furnaces, FurnacesAdmin)
admin.site.register(Services, ServicesAdmin)