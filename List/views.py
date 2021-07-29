from django.shortcuts import render, HttpResponse, redirect, reverse
from django.views import View

from .models import ListModel, TaskModel, ItemModel

class TodoView(View):
    tmp = 'g/todo.html'
    tmp_tasks = 'g/task.html'
    tmp_list = 'g/list.html'
    tmp_task_items = 'g/taskItems.html'

    def get(self, request, operation = None):
        if(operation == None):
            listActive = ListModel.objects.filter(active=True)
            title = ""
            tasks = []
            if(len(listActive) > 0):
                title = listActive[0].name
                tasks = listActive[0].taskmodel_set.all()
            context = {
                "theList" : ListModel.objects.all(),
                "title" : title,
                "tasks" : tasks,
            }
            return render(request, self.tmp, context)
        return HttpResponse("404")

    ## =============================
    ## =============================
    ## =============================

    def taskItemOperations(self, request, operation):
        if operation == 'task_item_add':
            id = request.POST.get('id')
            task = TaskModel.objects.get(id = id)
            item = ItemModel(name = "new task item", Task = task)
            item.save()
            context = {
                "taskItem" : task.itemmodel_set.all()
            }
            return render(request, self.tmp_task_items, context)
        elif operation == 'task_item_modify':
            id = request.POST.get('id')
            newName = request.POST.get('newName')
            taskItem = ItemModel.objects.get(id = id)
            if bool(newName.strip()):
                taskItem.name = newName
                taskItem.save()
            return HttpResponse(taskItem.name)
        elif operation == 'task_item_delete':
            id = request.POST.get('id')
            ItemModel.objects.get(id = id).delete()
            return HttpResponse("Success")
        elif operation == 'task_item_change_progress':
            id = request.POST.get('id')
            value = request.POST.get('value')
            item = ItemModel.objects.get(id = id)
            item.progress = int(value)
            item.save()
            return HttpResponse("Success")
        return HttpResponse("Failed")

    def taskOperations(self, request, operation):
        if(operation == 'task_add'):
            id = request.POST.get('id')
            ob = ListModel.objects.get(id = id)
            newTask = TaskModel(name = "New Task", theList=ob)
            newTask.save()
            context = {
                "title" : ob.name,
                "tasks" : ob.taskmodel_set.all()
            }
            return render(request, self.tmp_tasks, context)
        elif(operation == 'task_modify'):
            id = request.POST.get('id')
            newName = request.POST.get('newName')
            
            ob = TaskModel.objects.get(id = id)
            if bool(newName.strip()):
                ob.name = newName
                ob.save()
                return HttpResponse(newName)
            else:
                return HttpResponse(ob.name)
        elif(operation == 'task_delete'):
            id = request.POST.get('id')
            ob = TaskModel.objects.get(id = id)
            ob.delete()
            return HttpResponse("Success")
        return self.taskItemOperations(request, operation)

    def listOperations(self, request, operation):
        if(operation == 'list_open'):
            id = request.POST.get('id')

            oldL = ListModel.objects.filter(active=True)
            if len(oldL) > 0:
                oldL = oldL[0]
                oldL.active=False
                oldL.save()

            l = ListModel.objects.filter(id = id)[0]
            l.active = True

            l.save()

            context = {
                "tasks" : l.taskmodel_set.all(),
                "title" : l.name
            }
            return render(request, self.tmp_tasks, context)
        elif(operation == 'list_add'):
            newItem = ListModel(name = "New Item")
            newItem.save()
            context = {
                "theList" : ListModel.objects.all()
            }
            return render(request, self.tmp_list, context)
        elif(operation == 'list_modify'):
            id = request.POST.get('id')
            newName = request.POST.get('newName')

            ob = ListModel.objects.get(id = id)
            if bool(newName.strip()):
                ob.name = newName
                ob.save()
                return HttpResponse(newName)
            else:
                return HttpResponse(ob.name)
        elif(operation == 'list_delete'):
            id = request.POST.get('id')

            ob = ListModel.objects.get(id = id)

            title = ""
            tasks = []
            
            if ob.active:
                theList = ListModel.objects.all()
            
                if len(theList) > 0:
                    theList[0].active = True
                    title = theList[0].name
                    tasks = theList[0].taskmodel_set.all()
                    theList[0].save()
                    
                ob.delete()
            else:
                ob.delete()
                return HttpResponse("")
            
            context = {
                "theList" : ListModel.objects.all(),
                "title" : title,
                "tasks" : tasks,
            }
            return render(request, self.tmp, context)
        return self.taskOperations(request, operation)
    
        

    def post(self, request, operation = None):
        return self.listOperations(request, operation)
