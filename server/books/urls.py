from django.urls import include, path

from books.routers import router
from books.views import BooksList

app_name = 'books'

urlpatterns = [
    path('', include(router.urls)),
    path('search-books/', BooksList.as_view(), name='search_books')
]
