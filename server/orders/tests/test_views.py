from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model
from django.urls import reverse 

from books import models as book_models
from books import factories as book_factories

from accounts import factories as account_factories
from accounts import models as account_models

from orders import models as order_models
from orders import factories as order_factories


User = get_user_model()


class OrderTestCase(APITestCase):
    def setUp(self):
        """ Initial settings and create instances to test orders """
        self.profile = account_factories.ProfileFactory()
        self.token = Token.objects.get(user=self.profile.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.book = book_factories.BookFactory()
        self.test_order_data = {
            'profile': self.profile.pk,
            'book': [self.book.pk,],
            'address': 'Address',
            'status': 'paid',
            'total_price': 2000
        }

    def test_create_order(self):
        """ Test creating order """
        response = self.client.post(
            reverse('orders:orders-list'), 
            data=self.test_order_data
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data)

    def test_get_orders(self):
        """ Test retrieving all orders """
        order_factories.OrderFactory()
        response = self.client.get(reverse('orders:orders-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)

    def test_get_order(self):
        """ Test retrieving details about one order """
        order = order_factories.OrderFactory()
        response = self.client.get(reverse('orders:orders-detail', kwargs={'pk': order.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
        self.assertTrue(order_models.Order.objects.filter(pk=order.pk).exists())

    def test_delete_order(self):
        """ Test deleting order """
        order = order_factories.OrderFactory()
        response = self.client.delete(reverse('orders:orders-detail', kwargs={'pk': order.pk}))
        self.assertFalse(order_models.Order.objects.filter(pk=order.pk).exists())

    def test_update_order(self):
        """ Test updating order """
        order = order_factories.OrderFactory()
        response = self.client.patch(
            reverse('orders:orders-detail', kwargs={'pk': order.pk}),
            data={'address': 'New address'}
        )
        order.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(order.address, 'New address')
