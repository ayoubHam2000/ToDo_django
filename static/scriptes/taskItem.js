function addItemToTask(e){
    console.log("addItemToTask")
    target = e.target
    father = $(target).closest('.task_item')[0]
    console.log("Add item to Task : " + father.id)


    data = getPostDict()
    data['id'] = father.id
    
    $.ajax({ 
      data: data, 
      type: 'POST',
      url: URL_ADD_TASK_ITEM, 
      success: function(response) { 
          console.log("success")
          $(father).find(".task_list_item")[0].innerHTML = response
        },
        error: function(e, x, r) {
            console.log(e.responseText)
        }
    });

}

function modifyTaskItem(e){
    console.log("modifyTaskItem")
    target = e.target
    father = $(target).closest('.item_task')
    item = father.find(".task_item_title")[0]
    modifyItem(item, (newValue) => {
        console.log("NewValue : " + newValue)

        father = $(item).closest(".item_task")[0]

        data = getPostDict()
        data['id'] = father.id
        data['newName'] = newValue
        
        $.ajax({ 
          data: data, 
          type: 'POST',
          url: URL_MODIFY_TASK_ITEM, 
          success: function(response) { 
              console.log("success")
              item.children[0].innerHTML = response
            },
            error: function(e, x, r) {
                console.log(e.responseText)
            }
        });


    })
}

function deleteTaskItem(e){
    if(!confirm("Sure ??"))
        return

    console.log("deleteTaskItem")
    target = e.target
    father = $(target).closest('.item_task')[0]
    console.log("Delete Item : " + father.id)

    data = getPostDict()
    data['id'] = father.id
    
    $.ajax({ 
        data: data, 
        type: 'POST',
        url: URL_DELETE_TASK_ITEM, 
        success: function(response) { 
            console.log("success")
            father.remove()
        },
        error: function(e, x, r) {
            console.log(e.responseText)
        }
    });
}

/* ============================================== */


function changeProgress(e, type){
    stepProgress = 5
    target = e.target
    father = $(target).closest('.item_task')[0]
    progressBar = $(father).find(".progress-bar")[0]
    span = $(father).find("span")[0]
    progressValue = parseInt(progressBar.style.width)

    
    if(progressValue + type * stepProgress < 0){
        progressValue = 0
    }else if(progressValue + type * stepProgress > 100){
        progressValue = 100
    }else{
        progressValue = progressValue + type * stepProgress
    }
    
    data = getPostDict()
    data['id'] = father.id
    data['value'] = progressValue

    $.ajax({ 
        data: data, 
        type: 'POST',
        url: URL_CHANGE_PROGRESS_TASK_ITEM, 
        success: function(response) { 
            console.log("success")
            progressBar.style.width = progressValue + "%"
            span.innerHTML = progressBar.style.width
            console.log("minusProgress : " + father.id)
        },
        error: function(e, x, r) {
            console.log(e.responseText)
        }
    });
    

}

function addProgress(e){
    console.log("addProgress")
    changeProgress(e, 1)
}

function minusProgress(e){
    console.log("minusProgress")
    changeProgress(e, -1)
}

