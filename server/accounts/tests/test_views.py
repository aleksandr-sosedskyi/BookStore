from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

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
        user = self.User.objects.create_user(email=self.email, password=self.password)
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

    def test_rate_requests(self):
        user = self.User.objects.create_user(email=self.email, password=self.password)
        data = {
            'username': self.email,
            'password': 'wrong_password'
        }
        for _ in range(3):
            self.client.post(reverse('accounts:login'), data)
        response = self.client.post(reverse('accounts:login'), data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ProfileTest(APITestCase):
    """ Test Profile CRUD """
    User = get_user_model()

    def setUp(self):
        """ Initial settings """
        self.user = self.User.objects.create_user(email='example@example.com', password='example11200')
        self.token = Token.objects.get(user=self.user).key
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        self.test_data = {
            'first_name': 'Test',
            'last_name': 'Test',
            'phone': '380661204500',
            'user': self.user,
        }
        
    def create_profile(self):
        """ Create a profile """

        profile = models.Profile.objects.create(**self.test_data)
        return profile

    def test_create_profile(self):
        """ Test creating profile """
        data = self.test_data.copy()
        data['user'] = self.test_data['user'].pk
        response = self.client.post(reverse('accounts:profiles-list'), data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_profiles(self):
        """ Test getting profile queryset """
        self.create_profile()
        response = self.client.get(reverse('accounts:profiles-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)        
        self.assertTrue(response.data)
    
    def test_update_profile(self):
        """ Test updating profile """
        profile = self.create_profile()
        url = reverse('accounts:profiles-detail', kwargs={'pk': profile.pk})
        response = self.client.patch(url, data={'first_name': 'New name'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(profile.first_name, response.data['first_name'])
    
    def test_delete_profile(self):
        """ Test deleting profile """
        profile = self.create_profile()
        url = reverse('accounts:profiles-detail', kwargs={'pk': profile.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_retrieve_profile(self):
        """ Test retrieving detail profile """
        profile = self.create_profile()
        url = reverse('accounts:profiles-detail', kwargs={'pk': profile.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    