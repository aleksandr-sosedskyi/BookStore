from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from accounts.serializers import SignUpSerializer


@api_view(['POST',])
def signup(request):
    """ View for processing signing up """
    serializer = SignUpSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        data['response'] = "Successfully registered a new user!"
        data['email'] = user.email
    else:
        data = serializer.errors
    return Response(data)