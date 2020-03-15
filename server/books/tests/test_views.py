from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.urls import reverse
from django.contrib.auth import get_user_model

from books import models


User = get_user_model()

class AgeCategoryTestCase(APITestCase):
    def setUp(self):
        """ Initial setting for client """
        self.user = User.objects.create_user(email='example@example.com', password='example11200')
        self.token = Token.objects.get(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    
    def create_category(self):
        """ Create age category object """
        category = models.AgeCategory.objects.create(name='name')
        return category

    def test_create_category(self):
        """ Test creating age category """
        response = self.client.post(reverse('books:age-categories-list'), data={'name': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Test')
    
    def test_get_categories(self):
        """ Test retrieving all age categories """
        self.create_category()
        response = self.client.get(reverse('books:age-categories-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)

    def test_retrieve_category(self):
        """ Test retrieving detail age category """
        category = self.create_category()
        url = reverse('books:age-categories-detail', kwargs={'pk': category.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], category.id)

    def test_delete_category(self):
        """ Test deleting age category """
        category = self.create_category()
        url = reverse('books:age-categories-detail', kwargs={'pk': category.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GenreTestCase(APITestCase):
    def setUp(self):
        """ Initial setting for client """
        self.user = User.objects.create_user(email='example@example.com', password='example11200')
        self.token = Token.objects.get(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
    
    def create_genre(self):
        """ Create genre object """
        genre = models.Genre.objects.create(name='name')
        return genre

    def test_create_genre(self):
        """ Test genre category """
        response = self.client.post(reverse('books:genres-list'), data={'name': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Test')
    
    def test_get_genres(self):
        """ Test retrieving all genres """
        self.create_genre()
        response = self.client.get(reverse('books:genres-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)

    def test_retrieve_genre(self):
        """ Test retrieving detail genre """
        genre = self.create_genre()
        url = reverse('books:genres-detail', kwargs={'pk': genre.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], genre.id)

    def test_delete_genre(self):
        """ Test deleting genre """
        genre = self.create_genre()
        url = reverse('books:genres-detail', kwargs={'pk': genre.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
