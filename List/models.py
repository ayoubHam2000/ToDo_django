from django.db import models

class ListModel(models.Model):
    name = models.CharField(max_length=100)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class TaskModel(models.Model):
    theList = models.ForeignKey(ListModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class ItemModel(models.Model):
    Task = models.ForeignKey(TaskModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    progress = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
