from django.contrib import admin

from books import models


admin.site.register(models.AgeCategory)
admin.site.register(models.Genre)
