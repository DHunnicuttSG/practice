from django.shortcuts import render
from rest_framework.templatetags.rest_framework import data

from .models import AppData

# Create your views here.
def get(request):
    todos = AppData.objects.all()
    return render(request, "todos.html", {'data': data})
