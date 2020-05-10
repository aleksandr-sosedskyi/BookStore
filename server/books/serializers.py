from rest_framework import serializers

from books import models


class GenreSerializer(serializers.ModelSerializer):
    """ Serializer for Genre model """
    class Meta:
        model = models.Genre
        fields = ('id', 'name')


class BookSerializer(serializers.ModelSerializer):
    """ Serializer for Book model """
    genre_name = serializers.SerializerMethodField()

    class Meta:
        model = models.Book
        fields = '__all__'

    def get_genre_name(self, obj):
        return obj.genre.name
    

class CommentSerializer(serializers.ModelSerializer):
    """ Serializer for Comment model """
    class Meta: 
        model = models.Comment
        fields = '__all__'
        