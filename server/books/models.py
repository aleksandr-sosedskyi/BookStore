from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator, MinLengthValidator

from accounts.models import Profile


class Genre(models.Model):
    """ Book genre """
    name = models.CharField(max_length=50, validators=[MinLengthValidator(3),])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Genre'
        verbose_name_plural = 'Genres'


class Book(models.Model):
    """ Book model """
    genre = models.ForeignKey(
        Genre, 
        related_name='books', 
        on_delete=models.SET_NULL, 
        null=True
    )
    year = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(2100)]
    )
    title = models.CharField(max_length=150, validators=[MinLengthValidator(3),])
    image = models.FileField(upload_to='books/', blank=True)
    author = models.CharField(max_length=255, validators=[MinLengthValidator(3),])
    pages = models.PositiveIntegerField(validators=[MinValueValidator(1),])
    description = models.TextField(validators=[MinLengthValidator(10), ])
    price = models.DecimalField(max_digits=6, decimal_places=2)
    in_stock = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + " - " + self.author
    
    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'
    

class Comment(models.Model):
    """ Model to keep comments to book """
    profile = models.ForeignKey(
        Profile,
        related_name='comments',
        on_delete=models.CASCADE
    )
    book = models.ForeignKey(
        Book,
        related_name='comments',
        on_delete=models.CASCADE
    )
    text = models.TextField(validators=[MinLengthValidator(5),])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.book.title
    
    class Meta:
        verbose_name = 'Book comment'
        verbose_name_plural = 'Book comments'
