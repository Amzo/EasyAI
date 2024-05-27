from rest_framework import serializers
from .models import Layer, NeuralNetwork

class LayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Layer
        fields = '__all__'

class NeuralNetworkSerializer(serializers.ModelSerializer):
    layers = LayerSerializer(many=True)

    class Meta:
        model = NeuralNetwork
        fields = '__all__'