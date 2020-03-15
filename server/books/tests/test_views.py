from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token

from django.urls import reverse
from django.contrib.auth import get_user_model

from books import models

import decimal


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

    def test_update_category(self):
        """ Test updating category """
        category = self.create_category()
        url = reverse('books:age-categories-detail', kwargs={'pk': category.pk})
        response = self.client.patch(url, {'name': 'new_name'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        category.refresh_from_db()
        self.assertEqual(category.name, 'new_name')
        

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
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_genre(self):
        """ Test updating genre """
        genre = self.create_genre()
        url = reverse('books:genres-detail', kwargs={'pk': genre.pk})
        response = self.client.patch(url, {'name': 'new_name'})
        genre.refresh_from_db()
        self.assertEqual(genre.name, 'new_name')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class BookTestCase(APITestCase):
    """ Testing Book CRUD """

    def setUp(self):
        """ Initial setting for client """
        self.user = User.objects.create_user(
            email='example@example.com', 
            password='example11200'
        )
        self.token = Token.objects.get(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.category = models.AgeCategory.objects.create(
            name='Test name'
        )
        self.genre = models.Genre.objects.create(
            name = 'Test name'
        )
        self.test_data = {
            'age_category': self.category,
            'genre': self.genre,
            'author': 'Author',
            'title': 'Title',
            'year': 2000,
            'buy_link': 'https://example.com',
            'pages': 100,
            'description': 'Test description',
            'in_stock': 1,
            'price': decimal.Decimal(10.50)
        }
    
    def create_book(self):
        """ Create book """
        book = models.Book.objects.create(**self.test_data)
        return book

    def test_create_book(self):
        """ Test creating book """
        url = reverse('books:books-list')
        data = self.test_data.copy()
        data['age_category'] = self.test_data['age_category'].pk
        data['genre'] = self.test_data['genre'].pk
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete_book(self):
        """ Test deleting book """
        book = self.create_book()
        url = reverse('books:books-detail', kwargs={'pk': book.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_update_book(self):
        """ Test updating book """
        book = self.create_book()
        url = reverse('books:books-detail', kwargs={'pk': book.pk})
        response = self.client.patch(url, {'title': 'new_title'})
        book.refresh_from_db()
        self.assertEqual(book.title, 'new_title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_books(self):
        """ Test retrieving all books """
        self.create_book()
        response = self.client.get(reverse('books:books-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
    
    def test_retrieve_book(self):
        """ Test retrieving a book """
        book = self.create_book()
        url = reverse('books:books-detail', kwargs={'pk': book.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
        