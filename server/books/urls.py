from django.urls import include, path

from books.routers import router


app_name = 'books'

urlpatterns = [
    path('', include(router.urls)),
    
]
