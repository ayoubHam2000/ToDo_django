from django.urls import path

from .views import (
    TodoView
)

app_name = 'List'

urlpatterns = [
    path('', TodoView.as_view(), name = "todoView"),
    path('list/<str:operation>', TodoView.as_view(), name = "todoOperations"),
]

## operation
### list_open - URL_OPEN_LIST_ITEM
### list_add - URL_ADD_LIST_ITEM
### list_delete - URL_DELETE_LIST_ITEM
### list_modify - URL_MODIFY_LIST_ITEM

### task_add - URL_ADD_TASK
### task_modify - URL_MODIFY_TASK
### task_delete - URL_DELETE_TASK

### task_item_add - URL_ADD_TASK_ITEM
### task_item_modify - URL_MODIFY_TASK_ITEM
### task_item_delete - URL_DELETE_TASK_ITEM
### task_item_change_progress - URL_CHANGE_PROGRESS_TASK_ITEM