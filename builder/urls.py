from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LayerViewSet, NeuralNetworkViewSet
from . import views

router = DefaultRouter()
router.register(r'layers', LayerViewSet)
router.register(r'neural-networks', NeuralNetworkViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('app/', views.react_app, name='react_app'),
]