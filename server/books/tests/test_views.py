from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token

from accounts.models import Profile

from django.urls import reverse
from django.contrib.auth import get_user_model

from books import models
from books.factories import (
    GenreFactory,
    BookFactory,
    CommentFactory
)

from accounts.factories import UserFactory, ProfileFactory

import decimal


User = get_user_model()

# Test data for Book model
book_data = {
    'genre': 'TO_OVERRIDE',
    'author': 'Author',
    'title': 'Title',
    'year': 2000,
    'pages': 100,
    'description': 'Test description',
    'in_stock': 1,
    'price': decimal.Decimal(10.50)
}

# Test data for profile
profile_data = {
    'first_name': 'Name',
    'last_name': 'Name',
    'phone': '380661204500',
    'user': 'TOOVERRIDE',
}


class GenreTestCase(APITestCase):
    def setUp(self):
        """ Initial setting for client """
        self.user = UserFactory()
        self.token = Token.objects.get(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_create_genre(self):
        """ Test genre category """
        response = self.client.post(reverse('books:genres-list'), data={'name': 'Test'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Test')
    
    def test_get_genres(self):
        """ Test retrieving all genres """
        GenreFactory()
        response = self.client.get(reverse('books:genres-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)

    def test_retrieve_genre(self):
        """ Test retrieving detail genre """
        genre = GenreFactory()
        url = reverse('books:genres-detail', kwargs={'pk': genre.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], genre.id)

    def test_delete_genre(self):
        """ Test deleting genre """
        genre = GenreFactory()
        url = reverse('books:genres-detail', kwargs={'pk': genre.pk})
        response = self.client.delete(url)
        self.assertFalse(models.Genre.objects.filter(pk=genre.pk).exists())

    def test_update_genre(self):
        """ Test updating genre """
        genre = GenreFactory()
        url = reverse('books:genres-detail', kwargs={'pk': genre.pk})
        response = self.client.patch(url, {'name': 'new_name'})
        genre.refresh_from_db()
        self.assertEqual(genre.name, 'new_name')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class BookTestCase(APITestCase):
    """ Testing Book CRUD """

    def setUp(self):
        """ Initial setting for client """
        self.user = UserFactory()
        self.token = Token.objects.get(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        self.genre = GenreFactory()
        self.test_data = book_data.copy()
        self.test_data.update({
            'genre': self.genre.pk
        })

    def test_create_book(self):
        """ Test creating book """
        url = reverse('books:books-list')
        response = self.client.post(url, self.test_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete_book(self):
        """ Test deleting book """
        book = BookFactory()
        url = reverse('books:books-detail', kwargs={'pk': book.pk})
        response = self.client.delete(url)
        self.assertFalse(models.Book.objects.filter(pk=book.pk).exists())
    
    def test_update_book(self):
        """ Test updating book """
        book = BookFactory()
        url = reverse('books:books-detail', kwargs={'pk': book.pk})
        response = self.client.patch(url, {'title': 'new_title'})
        book.refresh_from_db()
        self.assertEqual(book.title, 'new_title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_books(self):
        """ Test retrieving all books """
        BookFactory()
        response = self.client.get(reverse('books:books-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
    
    def test_retrieve_book(self):
        """ Test retrieving a book """
        book = BookFactory()
        url = reverse('books:books-detail', kwargs={'pk': book.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
        

class CommentTestCase(APITestCase):
    """ Test Comment Endpoint """

    def setUp(self):
        """ Initial settings (create user, profile, token, genre, book) """
        self.profile = ProfileFactory()
        self.token = Token.objects.first().key
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        self.book = BookFactory()
        self.test_comment_data = {
            'profile': self.profile.pk,
            'book': self.book.pk,
            'text': 'Test text',
            'mark': 4
        }
    
    def test_create_comment(self):
        """ Test create comment endpoint """
        response = self.client.post(
            reverse('books:comments-list'), 
            data=self.test_comment_data
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data)
    
    def test_get_comments(self):
        """ Test get comments endpoint """
        CommentFactory()
        response = self.client.get(reverse('books:comments-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
    
    def test_get_comment(self):
        """ Test get detail comment endpoint """
        comment = CommentFactory()
        url = reverse('books:comments-detail', kwargs={'pk': comment.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
    
    def test_update_comment(self):
        """ Test update comment endpoint """
        comment = CommentFactory()
        url = reverse('books:comments-detail', kwargs={'pk': comment.pk})
        response = self.client.patch(url, {'text': 'New text'})
        comment.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
        self.assertTrue(comment.text, 'New text')
    
    def test_delete_comment(self):
        """ Test delete comment endpoint """
        comment = CommentFactory()
        url = reverse('books:comments-detail', kwargs={'pk': comment.pk})
        response = self.client.delete(url)
        self.assertFalse(models.Comment.objects.filter(pk=comment.pk).exists())
