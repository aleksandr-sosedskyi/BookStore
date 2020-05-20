from django.db import models
from django.contrib.auth import get_user_model

from accounts.models import Profile

from books.models import Book

import decimal


class Order(models.Model):
    """ Model for keeping order details """
    STATUS_CHOICES = (
        ('registered', 'Registered'),
        ('paid', 'Paid'),
        ('sent', 'Sent'),
        ('delivered', 'Delivered')
    )

    profile = models.ForeignKey(
        Profile,
        related_name='orders',
        on_delete=models.SET_NULL,
        null=True
    )
    book = models.ManyToManyField(Book, related_name='order_book', through='orders.OrderBook')
    address = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='registered')
    total_price = models.DecimalField(max_digits=7, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.profile.get_full_name() + " " + self.status 
    
    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'


class OrderBook(models.Model):
    """ Intermediate model to keep info about amount of books in orders """
    book = models.ForeignKey(
        Book, 
        related_name='order_book_book',
        on_delete=models.SET_NULL, 
        null=True
    )
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_book')
    amount = models.PositiveSmallIntegerField()
    

    def __str__(self):
        return f"{self.pk} {self.book.title}"

    class Meta:
        verbose_name = 'Book in order'
        verbose_name_plural = 'Books in orders'


class ShoppingCart(models.Model):
    """ Handle books in users' shopping carts """
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='shopping_cart')
    book = models.ForeignKey(Book, related_name='shopping_cart', on_delete=models.CASCADE)
    amount = models.PositiveSmallIntegerField()

    class Meta:
        verbose_name = 'Shopping Cart'
        verbose_name_plural = 'Shopping Carts'
    
    def __str__(self):
        return f"{self.profile} - {self.book}"
        