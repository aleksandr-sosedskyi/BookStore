from django.urls import include, path

from orders.routers import router


app_name = 'orders'

urlpatterns = [
    path('', include(router.urls))
]
