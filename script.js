String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

const add_new_task = document.getElementById('add');
const new_task_tag = document.getElementById('detail');

const task_holder = document.getElementById('task-list-holder');

let gl_counter = 1;
let gl_todo = {};

new_task_tag.addEventListener("keypress", (e)=>{
    if(e.key == 'Enter') {
        add_new_task.click();
    }
});

function initGlobalCounter() {
    if(localStorage.gl_counter == undefined) {
        localStorage.gl_counter = 1;
        return
    }
    if(localStorage.gl_todo != undefined) {
        gl_todo = JSON.parse(localStorage.gl_todo);
    }
    gl_counter = parseInt(localStorage.gl_counter);
    for(var i in gl_todo) {
        let entry = makeTaskNoId();
        entry.getElementsByClassName('info')[0].innerText = gl_todo[i];
        entry.getElementsByClassName('task-id')[0].innerText = i;
        task_holder.appendChild(entry);
    }
}

function getGlobalCounter() {
    if(localStorage.gl_counter == undefined) {
        localStorage.gl_counter = 1;
        return gl_counter;
    }
    else {
        gl_counter = parseInt(localStorage.gl_counter);
        localStorage.gl_counter = (gl_counter+1).toString();
        return gl_counter+1;
    }
}

function makeTaskNoId(){
    let node = document.createElement('div');
    node.className = "task";
    
    let node_id = document.createElement('span');
    node_id.className = "task-id";
    node.appendChild(node_id);
    let node_info = document.createElement('div');
    node_info.className = "info";
    node_info.innerText =  new_task_tag.value;
    node_info.addEventListener('focusout', (e)=>{
        node_info.contentEditable = false;
        node_info.classList.remove('info-edit');
        gl_todo[node_id.innerText] = node_info.innerText;
        localStorage.gl_todo = JSON.stringify(gl_todo);
    });
    node.appendChild(node_info);
    let node_edit = document.createElement('button');
    node_edit.innerText = 'Edit';
    node_edit.addEventListener('click', (e)=> {
        node_info.contentEditable = true;
        node_info.classList.add('info-edit');
    });
    node.appendChild(node_edit);

    let node_delete = document.createElement('button');
    node_delete.innerText = 'Delete';
    node_delete.addEventListener('click', (e)=>{
        node.parentNode.removeChild(node);
        let id = node_id.innerText;
        console.log(id);
        delete(gl_todo[id]);
        console.log(gl_todo);
        localStorage.gl_todo = JSON.stringify(gl_todo);
    });
    node.appendChild(node_delete);
    return node;
}

function makeTask() {
    let node = document.createElement('div');
    node.className = "task";
    
    let node_id = document.createElement('span');
    node_id.className = "task-id";
    node_id.innerText = getGlobalCounter();
    node.appendChild(node_id);
    let node_info = document.createElement('div');
    node_info.className = "info";
    node_info.innerText =  new_task_tag.value;
    node_info.addEventListener('focusout', (e)=>{
        node_info.contentEditable = false;
        node_info.classList.remove('info-edit');
        gl_todo[node_id.innerText] = node_info.innerText;
        localStorage.gl_todo = JSON.stringify(gl_todo);
    });
    node.appendChild(node_info);
    let node_edit = document.createElement('button');
    node_edit.innerText = 'Edit';
    node_edit.addEventListener('click', (e)=> {
        node_info.contentEditable = true;
        node_info.classList.add('info-edit');
    });
    node.appendChild(node_edit);

    let node_delete = document.createElement('button');
    node_delete.innerText = 'Delete';
    node_delete.addEventListener('click', (e)=>{
        node.parentNode.removeChild(node);
        let id = node_id.innerText;
        delete(gl_todo[id]);
        localStorage.gl_todo = JSON.stringify(gl_todo);
    });
    node.appendChild(node_delete);
    return node;
}

add_new_task.addEventListener('click', (e)=>{
    let entry = makeTask();

    let text = entry.getElementsByClassName('info')[0].innerText.toString();
    let id = entry.getElementsByClassName("task-id")[0].innerText.toString();

    if(text.length == 0) {
        alert('task details can\'t be empty' );
        return;
    }

    new_task_tag.innerHTML = '';

    task_holder.appendChild(entry);
    gl_todo[id] = text;
    localStorage.gl_todo = JSON.stringify(gl_todo);
});

window.onload = initGlobalCounter();