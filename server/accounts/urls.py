from django.urls import path
from .views import (
    signup,
)
from rest_framework.decorators import throttle_classes
from rest_framework.authtoken.views import obtain_auth_token
from accounts.prevent import UserLoginRateThrottle
app_name = 'accounts'

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', throttle_classes(['UserLoginRateThrottle',])(obtain_auth_token), name='login'),
]
