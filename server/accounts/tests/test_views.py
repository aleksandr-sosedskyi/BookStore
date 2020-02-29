from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from accounts.serializers import SignUpSerializer

import json


class SignUpTestCase(APITestCase):

    def test_signup(self):
        data = {
            'email': 'sanya1sosedskiy@gmail.com',
            'password1': 'Sanya1109200',
            'password2': 'Sanya1109200'
        }
        response = self.client.post(reverse('accounts:signup'), data)
        self.assertEqual(response.status_code, 200)

