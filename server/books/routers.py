from rest_framework.routers import DefaultRouter

from books import views


router = DefaultRouter()
router.register(r'age-categories', views.AgeCategoryViewSet, 'age-categories')
router.register(r'genres', views.GenreViewSet, 'genres')
router.register(r'books', views.BookViewSet, 'books')
