from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.db.models import F

from orders import models
from orders import serializers


class OrderViewSet(ModelViewSet):
    """ ViewSet for Orders """
    queryset = models.Order.objects.filter()
    serializer_class = serializers.OrderListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = models.Order.objects.filter(profile=self.request.user.profile).order_by('-created_at')
        return qs

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        order_id = obj.id 
        obj.delete()
        return Response({"id": order_id}, status=status.HTTP_200_OK)
        
    def create(self, request, *args, **kwargs):
        """ Create order from Shopping Cart items """
        serializer = serializers.CreateOrderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data
            shoppingCart = models.ShoppingCart.objects.filter(profile=request.user.profile)
            total_price = 0

            # Counting total price
            for i in shoppingCart:
                if i.book.in_stock < i.amount:
                    return Response(
                        {'errors': [f'Книг {i.book} всего {i.book.in_stock} в наличии']},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                total_price += i.book.price * i.amount

            order = models.Order.objects.create(
                address=validated_data['address'], 
                total_price=total_price,
                profile=request.user.profile
            )
            
            # Creating m2m objects for order
            for i in shoppingCart:
                order_book = models.OrderBook.objects.create(
                    book=i.book,
                    amount=i.amount,
                    order=order
                )
                i.book.in_stock = F('in_stock') - i.amount
                i.book.save()
                i.delete()

            serializer = serializers.OrderListSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ShoppingCartViewSet(ModelViewSet):
    """ Viewset for Shopping Carts """
    serializer_class = serializers.ShoppingCartListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.profile.shopping_cart.all()

    def create(self, request, *args, **kwargs):
        """ Overriding create shopping cart item """
        data = request.data

        # If book already exists in shopping cart - then add new amount to previous
        if (item := models.ShoppingCart.objects.filter(profile=data['profile'], book=data['book'])):
            item[0].amount = F('amount') + 1
            item[0].save()
            item[0].refresh_from_db()
            serializer = serializers.ShoppingCartListSerializer(instance=item[0])
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Serialize data and return object. If errors - return errors
        serializer = serializers.ShoppingCartDetailSerializer(data=data)
        if serializer.is_valid():
            item = serializer.save()
            serializer = serializers.ShoppingCartListSerializer(item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        item_id = obj.pk
        obj.delete()
        return Response({'id': item_id}, status=status.HTTP_200_OK)

    
