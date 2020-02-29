from rest_framework import serializers
from .models import User


class SignUpSerializer(serializers.ModelSerializer):
    """ Serializer to process user registration """

    password1 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ["email", "password1", "password2"]

    def save(self):
        user = User(
            email=self.validated_data['email'],
        )

        password1 = self.validated_data['password1']
        password2 = self.validated_data['password2']

        if password1 != password2:
            raise serializers.ValidationError({'password': "Passwords must match!"})
        user.set_password(password1)
        user.save()
        return user

