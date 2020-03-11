from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.authtoken.models import Token

from accounts.permissions import IPBLackListPermission
from accounts.serializers import SignUpSerializer


@api_view(['POST',])
def signup(request):
    """ View for processing Registration """
    
    serializer = SignUpSerializer(data=request.data)
    data = {}
    print(1111111)
    if serializer.is_valid():
        user = serializer.save()
        data['response'] = "Successfully registered a new user!"
        data['email'] = user.email
        token = Token.objects.get(user=user).key
        data['token'] = token

    else:
        data = serializer.errors
    return Response(data)
