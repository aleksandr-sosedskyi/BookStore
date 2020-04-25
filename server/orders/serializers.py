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


class OrderSerializer(serializers.ModelSerializer):
    """ Serializer for orders """
    order_book = OrderBookSerializer(many=True)
    profile_info = serializers.SerializerMethodField()

    class Meta:
        model = models.Order
        fields = ('profile', 'address', 'order_book', 'profile_info')
        extra_kwargs = {'profile': {'write_only': True}}

    def get_profile_info(self, obj):
        return ProfileSerializer(obj.profile).data
        
    def create(self, validated_data):
        # Counting total price and subtract amount of books from stock
        
        book_amount = dict()
        books_data = validated_data.get('order_book')

        for b in books_data:
            book_amount[b['book'].pk] = b['amount']
        books = Book.objects.filter(id__in=book_amount.keys())
        total_price = books.aggregate(Sum('price'))['price__sum']

        # Creating Order instance
        order = models.Order.objects.create(
            profile=validated_data.get('profile'),
            address=validated_data.get('address'),
            total_price=total_price
        )

        # Subtract amount of books in the order from Book instance
        for b in books:
            b.refresh_from_db()
            amount = book_amount[b.pk]
            if amount > b.in_stock:
                raise serializers.ValidationError(f'There are {b.in_stock} {b.title} books in stock')
            b.in_stock = F('in_stock') - amount
            b.save()

            # Creating objects of 'Through' model of Books and Orders
            models.OrderBook.objects.create(
                book=b,
                order=order,
                amount=book_amount[b.pk]
            )

        order.save()
        return order