from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameViewSet, RoundViewSet

router = DefaultRouter()
router.register(r'games', GameViewSet)
router.register(r'rounds', RoundViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
