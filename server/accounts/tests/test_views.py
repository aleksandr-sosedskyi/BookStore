from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from accounts import models
from accounts.serializers import SignUpSerializer

import json


class AuthTestCase(APITestCase):
    email = "example@example.com"
    password = "example123"
    User = get_user_model()

    def test_signup(self):
        """ Test successfull Registration """
        data = {
            'email': self.email,
            'password1': self.password,
            'password2': self.password
        }
        response = self.client.post(reverse('accounts:signup'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_success(self):
        """ Test successfull Login """
        user = self.User(email=self.email)
        user.set_password(self.password)
        user.save()
        data = {
            "username": self.email,
            "password": self.password
        }
        response = self.client.post(reverse('accounts:login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_block_ip(self):
        """ Test Blocking IP address """
        data = {
            'username': self.email,
            'password1': self.password,
            'password2': self.password
        }
        models.IPBlackList.objects.create(ip_addr='127.0.0.1')
        response = self.client.post(reverse('accounts:signup'), data, REMOTE_ADDR="127.0.0.1")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
