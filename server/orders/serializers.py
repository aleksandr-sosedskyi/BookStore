from rest_framework import serializers

from orders import models

from books.models import Book
from books.serializers import BookSerializer


class OrderSerializer(serializers.ModelSerializer):
    """ Serializer for orders """
    book = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Book.objects.all()
    )

    class Meta:
        model = models.Order
        fields = ['profile', 'book', 'address', 'total_price']
