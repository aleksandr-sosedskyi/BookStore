from rest_framework import serializers

from books import models

from accounts.serializers import ProfileSerializer


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


class CommentSerializer(serializers.ModelSerializer):
    """ Serializer for Comment model """
    class Meta: 
        model = models.Comment
        fields = '__all__'
        
        
class BookDetailSerializer(serializers.ModelSerializer):
    """ Serialize detail info about book """
    genre = serializers.ReadOnlyField(source='genre.name')
    
    class Meta:
        model = models.Book
        fields = (
            'title', 'author', 'id', 'image', 'year', 'price',
            'pages', 'description', 'genre', 'in_stock', 'comments'
            )
        depth = 2