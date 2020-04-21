import factory

from django.contrib.auth import get_user_model

from accounts import models as account_models


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    email = factory.Sequence(lambda n: f'example{n}@example.com')
    password = 'Example11200'

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        """ Overriding default 'create' with our custom call """
        manager = cls._get_manager(model_class)
        return manager.create_user(*args, **kwargs)


class ProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = account_models.Profile

    first_name = 'First'
    last_name = 'Last'
    user = factory.SubFactory(UserFactory)
    

