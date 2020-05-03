from rest_framework import serializers

from django.contrib.auth import get_user_model, authenticate
from django.utils import timezone

from accounts.models import Profile


class SignUpSerializer(serializers.ModelSerializer):
    """ Serializer to process user registration """

    password1 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = get_user_model()
        fields = ["email", "password1", "password2"]

    def save(self):
        user = get_user_model()(
            email=self.validated_data['email'],
        )

        password1 = self.validated_data['password1']
        password2 = self.validated_data['password2']

        if password1 != password2:
            raise serializers.ValidationError({'password': "Passwords must match!"})
        user.set_password(password1)
        user.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    """ User profile serializer """
    email = serializers.EmailField(source='user.email', required=False)

    class Meta:
        model = Profile
        fields = (
            'id', 'user', 'first_name', 'last_name', 'phone', 
            'created_at', 'updated_at', 'email')
        read_only_fields = ('created_at', 'updated_at', 'id')

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone = validated_data.get('phone', instance.phone)
        if 'user' in validated_data:
            user = instance.user
            user.email = validated_data.get('user')['email']
            user.save()
        return instance


class LoginSerializer(serializers.Serializer):
  email = serializers.CharField(max_length=255)
  password = serializers.CharField(max_length=255)

  def validate(self, data):
    user = authenticate(**data, request=self.context.get('request'))
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")
        