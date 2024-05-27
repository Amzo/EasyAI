from rest_framework import viewsets
from .models import Layer, NeuralNetwork
from .serializers import LayerSerializer, NeuralNetworkSerializer
from django.shortcuts import render


class LayerViewSet(viewsets.ModelViewSet):
    queryset = Layer.objects.all()
    serializer_class = LayerSerializer


class NeuralNetworkViewSet(viewsets.ModelViewSet):
    queryset = NeuralNetwork.objects.all()
    serializer_class = NeuralNetworkSerializer


def react_app(request):
    return render(request, 'react/index.html')
