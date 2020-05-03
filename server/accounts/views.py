from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.authtoken.models import Token
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from accounts.permissions import IPBLackListPermission
from accounts.serializers import SignUpSerializer, ProfileSerializer, LoginSerializer
from accounts.models import Profile

@api_view(['POST',])
def signup(request):
    """ View for processing Registration """
    
    serializer = SignUpSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        data['response'] = "Successfully registered a new user!"
        data['email'] = user.email
        token = Token.objects.get(user=user).key
        data['token'] = token
    else:
        data = serializer.errors
    return Response(data)


class ProfileViewSet(ModelViewSet):
    """ Profile viewset """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly,]

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
