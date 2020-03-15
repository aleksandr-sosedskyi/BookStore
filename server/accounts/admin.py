from django.contrib import admin
from accounts import models


admin.site.register(models.IPBlackList)
admin.site.register(models.User)
admin.site.register(models.Profile)
