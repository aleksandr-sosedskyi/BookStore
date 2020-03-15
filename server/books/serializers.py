from rest_framework import serializers

from books import models


class AgeCategorySerializer(serializers.ModelSerializer):
    """ Serializer for Age Category model """
    class Meta:
        model = models.AgeCategory
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    """ Serializer for Genre model """
    class Meta:
        model = models.Genre
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    """ Serializer for Book model """
    class Meta:
        model = models.Book
        fields = '__all__'
    

class BookLikeDislike(serializers.ModelSerializer):
    """ Serializer for book likes and dislikes """
    class Meta: 
        model = models.BookLikeDislike
        fields = '__all__'
        