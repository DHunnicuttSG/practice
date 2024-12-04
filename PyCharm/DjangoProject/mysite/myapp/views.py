from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "myapp/index.html", {})

# from django.http import HttpResponse
#
# def index(request):
#   return HttpResponse("<h2>This is the Index page</h2>")