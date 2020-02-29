from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.serializers import SignUpSerializer

import json


class AuthTestCase(APITestCase):
    email = "example@example.com"
    password = "example123"

    def test_signup(self):
        data = {
            'email': self.email,
            'password1': self.password,
            'password2': self.password
        }
        response = self.client.post(reverse('accounts:signup'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_success(self):
        user = get_user_model().objects.create(email=self.email)
        user.set_password(self.password)
        user.save()
        data = {
            "username": self.email,
            "password": self.password
        }
        response = self.client.post(reverse('accounts:login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    