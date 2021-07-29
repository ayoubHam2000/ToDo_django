function addTask(e){
  console.log("addTask")
  target = e.target
  father = $(target).closest('.the_item')[0]
  console.log("Add item to Task : " + father.id)

  data = getPostDict()
  data['id'] = father.id

  $.ajax({ 
      data: data, 
      type: 'POST',
      url: URL_ADD_TASK, 
      success: function(response) { 
          console.log("success")
          $(".The_List_of_Tasks")[0].innerHTML = response
      },
      error: function(e, x, r) {
          console.log(e.responseText)
      }
  });


}

function modifyTask(e){
  console.log("modifyTask")
  target = e.target
  father = $(target).closest('.task_item')
  item = father.find(".task_title")[0]
  modifyItem(item, (newValue) => {
    father = $(item).closest('.task_item')[0]
    console.log("NewValue : " + newValue + " " + father.id)

    data = getPostDict()
    data['id'] = father.id
    data['newName'] = newValue
  
    $.ajax({ 
        data: data, 
        type: 'POST',
        url: URL_MODIFY_TASK, 
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

function deleteTask(e){
  if(!confirm("Sure ??"))
    return

  console.log("deleteTask")
  target = e.target
  father = $(target).closest('.task_item')[0]
  console.log("Delete Item : " + father.id)

  data = getPostDict()
  data['id'] = father.id

  
  $.ajax({ 
    data: data, 
    type: 'POST',
    url: URL_DELETE_TASK, 
    success: function(response) { 
        console.log("success")
        father.remove()
      },
      error: function(e, x, r) {
          console.log(e.responseText)
      }
  });
}
