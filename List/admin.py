from django.contrib import admin

from .models import ListModel, TaskModel, ItemModel

admin.site.register(ListModel)
admin.site.register(TaskModel)
admin.site.register(ItemModel)
