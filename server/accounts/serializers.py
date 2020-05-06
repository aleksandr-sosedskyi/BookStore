from rest_framework import serializers

from django.contrib.auth import get_user_model, authenticate
from django.utils import timezone

from accounts.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """ User profile serializer """
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password', min_length=6)

    class Meta:
        model = Profile
        fields = (
            'id', 'first_name', 'last_name', 'phone', 
            'created_at', 'updated_at', 'email', 'password')
        read_only_fields = ('created_at', 'updated_at', 'id')
        write_only_fields = ('password',)

    def create(self, validated_data):
        if get_user_model().objects.filter(email=validated_data['user']['email']).exists():
            raise serializers.ValidationError({
                'email': 'This email already exists!'
            })
        user = get_user_model().objects.create_user(
            email=validated_data['user']['email'].lower(),
            password=validated_data['user']['email']
        )
        profile = Profile.objects.create(
            user=user,
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            phone=validated_data.get('phone'),
        )
        return profile

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
        