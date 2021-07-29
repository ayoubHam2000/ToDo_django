function modifyItem(item, complete = null){
    target = item.children[0]
    content = target.innerHTML

    if($(item).find("input").length > 0){
        return
    }
    
    input = document.createElement("input");
    input.value = content
    input.style.width = "100%"
    item.append(input)
    input.focus()
    target.style.display = 'none'

    $(input).on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            newValue = input.value
            target.innerHTML = newValue
            input.remove()
            target.style.display = 'block'
            if(complete != null){
                complete(newValue);
            }
        }
        if (e.key == "Escape"){
            input.remove()
            target.style.display = 'block'
        }
    });

}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function getPostDict(){
    var csrftoken = getCookie('csrftoken');
    data = {
        'csrfmiddlewaretoken' : csrftoken
    }
    return data
}