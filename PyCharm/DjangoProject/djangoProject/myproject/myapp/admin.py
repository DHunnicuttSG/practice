from django.contrib import admin

# Register your models here.
from .models import Contact

# get an admin interface
admin.site.register(Contact)
