from django.db import models

class Layer(models.Model):
    LAYER_TYPES = [
        ('input', 'Input Layer'),
        ('dense', 'Dense Layer'),
        ('conv', 'Convolutional Layer'),
        # Add other layer types as needed
    ]

    name = models.CharField(max_length=50)
    layer_type = models.CharField(max_length=10, choices=LAYER_TYPES)
    parameters = models.JSONField()  # Store parameters as JSON

    def __str__(self):
        return self.name

class NeuralNetwork(models.Model):
    name = models.CharField(max_length=100)
    layers = models.ManyToManyField(Layer, related_name='neural_networks')

    def __str__(self):
        return self.name