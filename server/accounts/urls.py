from django.urls import path, include

from rest_framework.decorators import throttle_classes
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from accounts.routers import router
from accounts.views import signup


app_name = 'accounts'

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', obtain_auth_token, name='login'),
    path('', include(router.urls))
]
