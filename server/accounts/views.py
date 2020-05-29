from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, throttle_classes
from rest_framework.authtoken.models import Token
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status

from accounts.permissions import IPBLackListPermission
from accounts.serializers import (
    ProfileSerializer,
    LoginSerializer, 
    ProfileUpdateSerializer 
)
from accounts.models import Profile


class SignUpView(APIView):
    """ View for processing Registration """
    def post(self, request, *args, **kwargs):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            profile = serializer.save()
            token, created = Token.objects.get_or_create(user=profile.user)
            return Response({'profile': serializer.data, 'token': token.key})
        else:
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )


class ProfileViewSet(ModelViewSet):
    """ Profile viewset """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

    def update(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = ProfileUpdateSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            profile.refresh_from_db()
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = Token.objects.get(user=user).key
        
        profile = user.profile
        return Response({
            "token": token,
            "profile": ProfileSerializer(profile).data
        })

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        return Response({
            'profile': ProfileSerializer(request.user.profile).data
        })
