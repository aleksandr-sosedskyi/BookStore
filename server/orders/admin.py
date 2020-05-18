from django.contrib import admin

from orders import models


admin.site.register(models.Order)
admin.site.register(models.OrderBook)
admin.site.register(models.ShoppingCart)