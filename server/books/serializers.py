from rest_framework import serializers

from books import models


class GenreSerializer(serializers.ModelSerializer):
    """ Serializer for Genre model """
    class Meta:
        model = models.Genre
        fields = ('id', 'name')


class BookSerializer(serializers.ModelSerializer):
    """ Serializer for Book model """
    class Meta:
        model = models.Book
        fields = '__all__'
    

class BookLikeDislikeSerializer(serializers.ModelSerializer):
    """ Serializer for book likes and dislikes """
    class Meta: 
        model = models.BookLikeDislike
        fields = '__all__'
        

class CommentSerializer(serializers.ModelSerializer):
    """ Serializer for Comment model """
    class Meta: 
        model = models.Comment
        fields = '__all__'
        