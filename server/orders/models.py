from django.db import models
from django.contrib.auth import get_user_model

from accounts.models import Profile

from books.models import Book

import decimal


class Order(models.Model):
    """ Model for keeping order details """
    STATUS_CHOICES = (
        ('paid', 'Paid'),
        ('sent', 'Sent'),
        ('delivered', 'Delivered')
    )

    profile = models.ForeignKey(
        Profile,
        related_name='orders',
        on_delete=models.SET_NULL,
        null = True
    )
    book = models.ManyToManyField(Book, related_name='orders')
    address = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    total_price = models.DecimalField(max_digits=7, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.profile.get_full_name() + " " + self.status 
    
    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

