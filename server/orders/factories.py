import factory

from orders import models

from accounts import factories as account_factories
from books import factories as book_factories


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Order
    
    profile = factory.SubFactory(account_factories.ProfileFactory)
    address = 'Example address'
    status = 'paid'
    total_price = 2000

    @factory.post_generation
    def book(self, create, extracted, **kwargs):
        if not create:
            self.book.add(book_factories.BookFactory())
            return
        
        if extracted:
            for group in extracted:
                self.book.add(group)
