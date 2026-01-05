from django.contrib import admin
from .models import Furnaces, Services,FurnaceImages,ServiceImages

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


class ServiceImageInline(admin.TabularInline):
    model = ServiceImages
    extra = 1

class ServicesAdmin(admin.ModelAdmin):
    inlines = [ServiceImageInline]
    list_display = ('name','s_id')

admin.site.register(Furnaces,FurnacesAdmin)
admin.site.register(Services,ServicesAdmin)