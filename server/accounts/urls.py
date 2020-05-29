from django.urls import path, include

from rest_framework.decorators import throttle_classes
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from accounts.routers import router
from accounts.views import (
    SignUpView, 
    LoginView, 
    UserView,
    ChangePassword
)


app_name = 'accounts'

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('change-password/<int:pk>/', ChangePassword.as_view(), name='change_password'),
    path('user/', UserView.as_view(), name='user'),
    path('', include(router.urls))
]
