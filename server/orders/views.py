from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from orders import models
from orders import serializers


class OrderViewSet(ModelViewSet):
    """ ViewSet for Orders """
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
