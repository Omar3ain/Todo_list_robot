
const adding_form = document.getElementById('adding_task');
const lists = document.querySelector("[data-lists]");
const input = document.getElementById('addTaskInput');
const done_list = document.querySelector('.done_list');
const eye = document.querySelectorAll(".eye-center");
let counter =0 ;

class Storage {
    static addTodStorage(todoArr){
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }

    static getStorage(){
        let storage = localStorage.getItem("todo") === null ? 
        [] : JSON.parse(localStorage.getItem("todo"));
        return storage
    }
}

class Todo {
    constructor(id, todo){
        this.id = id;
        this.todo = todo;
        this.done = false;
    }
}

class UI{
    static displayDataToDo(){
        let displayData = todoArr.map((item) => {
            if(item.done === false){
                return `
                <div class="todo">
                <p>${item.todo}</p>
                <span class="material-symbols-outlined done" data-id="${item.id}">done</span>
                <span class="remove" data-id="${item.id}">X</span>
                </div>
            `
            }
        });
        lists.innerHTML = (displayData).join(" ");
    }
    static displayDataDone(){
        let displayData = todoArr.map((item) => {
            if(item.done === true){
                return `
                <div class="todo">
                <p>${item.todo}</p>
                <span class="remove" data-id="${item.id}">X</span>
                </div>
            `
            }
        });
        done_list.innerHTML = (displayData).join(" ");
    }
    static clearInput(){
        input.value = "";
    }

    static removeTodo(){
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")){
                let btnId = e.target.dataset.id;
                e.target.parentElement.remove();
                UI.removeArrayTodo(btnId);
            }
        });
        done_list.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")){
                let btnId = e.target.dataset.id;
                e.target.parentElement.remove();
                UI.removeArrayTodo(btnId);
            }
        });
    }
    static doneTodo(){
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains("done")){
                let btnId = e.target.dataset.id;
                e.target.parentElement.remove();
                UI.addToDoneArrayTodo(btnId);
            }
        });
    }
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addTodStorage(todoArr);
    }
    static addToDoneArrayTodo(id){
        let doneItem ={}
        doneItem = todoArr.filter((item) => item.id === +id)[0];
        done_list.innerHTML +=  `
                                <div class="todo">
                                <p>${doneItem.todo}</p>
                                <span class="remove" data-id="${doneItem.id}">X</span>
                                </div>
                            `;
        todoArr.forEach( function(obj) {
            if (obj.id === doneItem.id) {
                obj.done =true;
            }})
        Storage.addTodStorage(todoArr);                      
    }
}

let todoArr = Storage.getStorage();

input.addEventListener('keydown' , (event)=> {
    counter+=2;
    if(event.key ==='Backspace'){
        counter-=4;
    };
    if(counter <=33){
        eye.forEach(eye => {
            eye.style.top = `${counter}px`
        })
    }
    if(event.target.value.length === 0 ){
        counter=0;
        eye.forEach(eye => {
            eye.style.top = `0px`
        })
    }
})

adding_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.floor(Math.random() * 1000);
    const todo = new Todo(id, input.value);
    todoArr = [...todoArr, todo];
    UI.displayDataToDo();
    UI.clearInput();
    Storage.addTodStorage(todoArr);
    eye.forEach(eye => {
        eye.style.top = `0px`
    })
});

window.addEventListener("DOMContentLoaded", () => {
    UI.displayDataToDo();
    UI.displayDataDone()
    UI.doneTodo();
    UI.removeTodo();
});