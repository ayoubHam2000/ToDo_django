function turnOffActive(){
    items = $(".item_link").children("a")
    items.removeClass("active")
}

/*============================================================== */

function addItemList(e){
    console.log("addItemList")

    data = getPostDict()

    $.ajax({ 
        data: data, 
        type: 'POST',
        url: URL_ADD_LIST_ITEM, 
        success: function(response) { 
            console.log("success")
            $(".the_list_container")[0].innerHTML = response
        },
        error: function(e, x, r) {
            console.log(e.responseText)
        }
    });
}


function openItemList(e){
    console.log("openItemList")
    target = e.target
    father = $(target).closest('.the_item')[0]
    console.log("Open Item : " + father.id)
    

    data = getPostDict()
    data['id'] = father.id

    $.ajax({ 
        data: data, 
        type: 'POST',
        url: URL_OPEN_LIST_ITEM, 
        success: function(response) { 
            console.log("success")
            turnOffActive()
            item = $(father.getElementsByTagName("a")[0])
            item.addClass("active")
            
            $(".The_List_of_Tasks")[0].innerHTML = response
            //console.log(response)
        },
        error: function(e, x, r) {
            console.log(e.responseText)
        }
    });

}


function modifyItemList(e){
    console.log("modifyItemList")
    target = e.target
    father = $(target).closest('.the_item')
    item = father.find(".item_link")[0]
    modifyItem(item, (newValue) => {
        father = $(item).closest('.the_item')[0]
        console.log("NewValue : " + newValue + " " + father.id)

        data = getPostDict()
        data['id'] = father.id
        data['newName'] = newValue

        $.ajax({ 
            data: data, 
            type: 'POST',
            url: URL_MODIFY_LIST_ITEM, 
            success: function(response) { 
                console.log("success")
                item.children[0].innerHTML = response
                item_link = $(father).find(".item_link")[0].children[0]
                if($(item_link).hasClass("active")){
                    $(".The_List_of_Tasks").find(".the_task_title")[0].innerHTML = newValue
                }
            },
            error: function(e, x, r) {
                console.log(e.responseText)
            }
        });
        
    })
}

function deleteItemList(e){
    if(!confirm("Sure ??"))
        return
    
    console.log("deleteItemList")
    target = e.target
    father = $(target).closest('.the_item')[0]
    console.log("Delete Item : " + father.id)

    data = getPostDict()
    data['id'] = father.id
    
    $.ajax({ 
        data: data, 
        type: 'POST',
        url: URL_DELETE_LIST_ITEM, 
        success: function(response) { 
            console.log("success")
            
            if(response.length > 0)
                document.write(response);
            else
                father.remove()
            

            //location.reload();
        },
        error: function(e, x, r) {
            console.log(e.responseText)
        }
    });
}

