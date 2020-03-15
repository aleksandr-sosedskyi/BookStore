from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from books.models import (
    AgeCategory,
    Genre,
)
from books.serializers import (
    AgeCategorySerializer,
    GenreSerializer,
)


class AgeCategoryViewSet(ModelViewSet):
    """ ViewSet for Age Category model """
    queryset = AgeCategory.objects.all()
    serializer_class = AgeCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]


class GenreViewSet(ModelViewSet):
    """ ViewSet for Genre model """
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    