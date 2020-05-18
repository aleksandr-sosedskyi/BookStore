from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from orders import models
from orders import serializers


class OrderViewSet(ModelViewSet):
    """ ViewSet for Orders """
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]


class ShoppingCartViewSet(ModelViewSet):
    """ Viewset for Shopping Carts """
    serializer_class = serializers.ShoppingCartListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.profile.shopping_cart.all()
    
    def create(self, request, *args, **kwargs):
        serializer = serializers.ShoppingCartDetailSerializer(data=request.data)
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

    
