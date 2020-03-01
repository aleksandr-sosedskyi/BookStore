from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token 


class UserManager(BaseUserManager):
    """ Custom User Manager """
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError("Users must have email!")
        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email=email,
            password=password
        )
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user

        
class User(AbstractBaseUser):
    """ Custom User Model """
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    

@receiver(post_save, sender=get_user_model())
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """ Create Token after user signed up """
    if created:
        Token.objects.create(user=instance)
        

class IPBlackList(models.Model):
    """ Model to keep blocked IP adresses """
    ip_addr = models.GenericIPAddressField()
    reason = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.reason + self.ip_addr

    class Meta:
        verbose_name = 'Blocked IP address'
        verbose_name_plural = 'Blocked IP adresses'