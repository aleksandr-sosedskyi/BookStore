from rest_framework import serializers

import time

from django.db.models import Sum, F
from django.forms.models import model_to_dict

from orders import models

from books.models import Book
from books.serializers import BookSerializer

from accounts.serializers import ProfileSerializer


class OrderBookSerializer(serializers.ModelSerializer):
    """ Serializer for book and amount """
    book_info = serializers.SerializerMethodField()

    class Meta:
        model = models.OrderBook
        fields = ('book', 'amount', 'book_info')
        extra_kwargs = {'book': {'write_only': True}}

    def get_book_info(self, obj):
        return BookSerializer(obj.book).data


class CreateOrderSerializer(serializers.ModelSerializer):
    """ Serializer for creating order """
    class Meta:
        model = models.Order
        fields = ('address', )


class OrderListSerializer(serializers.ModelSerializer):
    """ Serializer for listing orders """
    order_book = OrderBookSerializer(many=True, read_only=True)
    
    class Meta:
        model = models.Order
        exclude = ['book']
        depth = 1

        
class ShoppingCartListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ShoppingCart
        fields = '__all__'
        depth = 1


class ShoppingCartDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ShoppingCart
        fields = '__all__'
        