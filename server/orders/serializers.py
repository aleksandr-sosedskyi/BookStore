from rest_framework import serializers

from django.db.models import Sum, F

from orders import models

from books.models import Book
from books.serializers import BookSerializer

from accounts.models import Profile


class OrderBookSerializer(serializers.Serializer):
    """ Serializer for book and amount """
    book = serializers.IntegerField()
    amount = serializers.IntegerField()


class OrderSerializer(serializers.ModelSerializer):
    """ Serializer for orders """
    order_books = OrderBookSerializer(many=True)

    class Meta:
        model = models.Order
        fields = ('profile', 'address', 'order_books')

    def create(self, validated_data):
        # Counting total price and subtract amount of books from stock
        order_books = dict()
        for b in validated_data.get('order_books'):
            order_books[b['book']] = b['amount']
        books = Book.objects.filter(id__in=order_books.keys())
        total_price = books.aggregate(Sum('price'))['price__sum']
        order = models.Order.objects.create(
            profile=validated_data.get('profile'),
            address=validated_data.get('address'),
            total_price=total_price
        )
        for b in books:
            b.refresh_from_db()
            amount = order_books[b.pk]
            if amount > b.in_stock:
                raise serializers.ValidationError(f'There are {b.in_stock} {b.title} books in stock')
            b.in_stock = F('in_stock') - 1
            b.save()
            models.OrderBook.objects.create(
                book=b,
                order=order,
                amount=order_books[b.pk]
            )
        order.save()
        return order