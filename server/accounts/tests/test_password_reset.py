from rest_framework.test import APITestCase
from rest_framework import status

from django.urls import reverse
from django.contrib.auth import get_user_model

from django_rest_passwordreset.models import ResetPasswordToken

from accounts.factories import UserFactory

class PasswordResetTestCase(APITestCase):
    User = get_user_model()

    def setUp(self):
        self.user = UserFactory()

    def send_reset_password_request(self, data):
        """ Send request to reset password """
        response = self.client.post(reverse('password_reset:reset-password-request'), data=data)
        return response

    def test_successful_generate_token(self):
        """ Test successful generating token for provided email """
        data = {
            'email': self.user.email
        }
        response = self.send_reset_password_request(data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_email(self):
        """ Test failure generating token for invalid email """
        data = {
            'email': 'wrong_email@example.com'
        }
        response = self.send_reset_password_request(data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_successful_validate_token(self):
        """ Test successful validating token """
        data = {
            'email': self.user.email
        }
        self.send_reset_password_request(data)
        token = ResetPasswordToken.objects.first().key
        response = self.client.post(reverse('password_reset:reset-password-validate'),
                                    data={'token': token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_fail_validating_token(self):
        """ Test unsuccessful validating wrong token """
        response = self.client.post(reverse('password_reset:reset-password-validate'),
                                    data={'token': 'wrong_token'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_successful_change_password(self):
        """ Test successful changing password with provided token and password """
        self.send_reset_password_request( {'email': self.user.email} )
        token = ResetPasswordToken.objects.first().key
        data = {
            'token': token,
            'password': 'exampleNewPassword'
        }
        response = self.client.post(reverse('password_reset:reset-password-confirm'), data=data)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('exampleNewPassword'))

    def test_fail_change_password(self):
        """ Test fail changing password with provided wrong token """
        data = {
            'token': 'wrong_token',
            'password': 'exampleNewPassword'
        }
        self.client.post(reverse('password_reset:reset-password-confirm'), data=data)
        self.assertFalse(self.user.check_password('exampleNewPassword'))
