from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token

from accounts.models import Profile

from django.urls import reverse
from django.contrib.auth import get_user_model

from books import models

import decimal


User = get_user_model()

# Test data for Book model
book_data = {
    'age_category': 'TO_OVERRIDE',
    'genre': 'TO_OVERRIDE',
    'author': 'Author',
    'title': 'Title',
    'year': 2000,
    'buy_link': 'https://example.com',
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
            name='Test name'
        )
        self.test_data = book_data.copy()
        self.test_data.update({
            'age_category': self.category,
            'genre': self.genre
        })
    
    def create_book(self):
        """ Create book """
        book = models.Book.objects.create(**self.test_data)
        return book

    def test_create_book(self):
        """ Test creating book """
        url = reverse('books:books-list')
        data = self.test_data.copy()
        data.update({
            'age_category': self.test_data['age_category'].pk,
            'genre': self.test_data['genre'].pk
        })
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
        

class BookLikeDislikeTestCase(APITestCase):
    """ Test book liking and disliking """

    def setUp(self):
        """ Initial settings (create user, profile, token category, genre, book) """
        self.user = User.objects.create_user(email='example@example.com', password='example11200')
        self.test_profile_data = profile_data.copy()
        self.test_profile_data.update({
            'user': self.user
        })
        self.profile = Profile.objects.create(**self.test_profile_data)
        self.token = Token.objects.first().key
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        self.category = models.AgeCategory.objects.create(name='name')
        self.genre = models.Genre.objects.create(name='name')
        self.test_book_data = book_data.copy()
        self.test_book_data.update({
            'age_category': self.category,
            'genre': self.genre
        })
        self.book = models.Book.objects.create(**self.test_book_data)
        self.test_like_data = {
            'profile': self.profile,
            'book': self.book,
            'like_type': 'like',
        }

    def create_like(self):
        """ Create BookLikeDislike object """
        like = models.BookLikeDislike.objects.create(**self.test_like_data)
        return like
    
    def test_create_like(self):
        """ Test creating book like """
        data = self.test_like_data.copy()
        data.update({
            'profile': self.test_like_data['profile'].pk,
            'book': self.test_like_data['book'].pk
        })
        response = self.client.post(reverse('books:likes-dislikes-list'), data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data)
    
    def test_get_likes(self):
        """ Test retrieving all likes/dislikes """
        self.create_like()
        response = self.client.get(reverse('books:likes-dislikes-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
    
    def test_get_like(self):
        """ Test retrieving a like/dislike """
        like = self.create_like()
        url = reverse('books:likes-dislikes-detail', kwargs={'pk': like.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
    
    def test_update_like(self):
        """ Test updating a like/dislike """
        like = self.create_like()
        url = reverse('books:likes-dislikes-detail', kwargs={'pk': like.pk})
        response = self.client.patch(url, {'like_type': 'dislike'})
        like.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(like.like_type, 'dislike')
    
    def test_delete_like(self):
        """ Test deleting a like/dislike """
        like = self.create_like()
        url = reverse('books:likes-dislikes-detail', kwargs={'pk': like.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class CommentTestCase(APITestCase):
    """ Test Comment Endpoint """

    def setUp(self):
        """ Initial settings (create user, profile, token category, genre, book) """
        self.user = User.objects.create_user(email='example@example.com', password='example11200')
        self.test_profile_data = profile_data.copy()
        self.test_profile_data.update({
            'user': self.user
        })
        self.profile = Profile.objects.create(**self.test_profile_data)
        self.token = Token.objects.first().key
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
        self.category = models.AgeCategory.objects.create(name='name')
        self.genre = models.Genre.objects.create(name='name')
        self.test_book_data = book_data.copy()
        self.test_book_data.update({
            'age_category': self.category,
            'genre': self.genre
        })
        self.book = models.Book.objects.create(**self.test_book_data)
        self.test_comment_data = {
            'profile': self.profile,
            'book': self.book,
            'text': 'Test text',
            'mark': 4
        }
    
    def create_comment(self):
        """ Create comment object """
        comment = models.Comment.objects.create(**self.test_comment_data)
        return comment
    
    def test_create_comment(self):
        """ Test create comment endpoint """
        data = self.test_comment_data.copy()
        data.update({
            'profile': self.test_comment_data['profile'].pk,
            'book': self.test_comment_data['book'].pk
        })
        response = self.client.post(reverse('books:comments-list'), data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data)
    
    def test_get_comments(self):
        """ Test get comments endpoint """
        self.create_comment()
        response = self.client.get(reverse('books:comments-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
    
    def test_get_comment(self):
        """ Test get detail comment endpoint """
        comment = self.create_comment()
        url = reverse('books:comments-detail', kwargs={'pk': comment.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
    
    def test_update_comment(self):
        """ Test update comment endpoint """
        comment = self.create_comment()
        url = reverse('books:comments-detail', kwargs={'pk': comment.pk})
        response = self.client.patch(url, {'text': 'New text'})
        comment.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data)
    
    def test_delete_comment(self):
        """ Test delete comment endpoint """
        comment = self.create_comment()
        url = reverse('books:comments-detail', kwargs={'pk': comment.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
