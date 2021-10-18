'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const btn = document.getElementById('add');

let toDoData = [];

const blockAdd = function() {
    btn.disabled = false;
    btn.style.cursor = 'initial';
    
    headerInput.addEventListener('input', blockAdd);
    if(!headerInput.value.trim()) {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    }
};

const addToLocalStorage = function() {
    localStorage.setItem('toDoData', JSON.stringify(toDoData));
};

const render = function() {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function(item) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        
        li.querySelector('.todo-complete').addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });
        li.querySelector('.todo-remove').addEventListener('click', function() {
            li.remove();
            toDoData = toDoData.filter((el) => {
                console.log('item.text', item.text);
                console.log('el.text', el.text);
                return item.text !== el.text;
            });

            addToLocalStorage();
        });
    });
    blockAdd();
    addToLocalStorage();
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    const newToDo = {
        text: headerInput.value,
        completed: false
    };

    toDoData.push(newToDo);
    headerInput.value = '';

    render();
});

blockAdd();

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem('toDoData')) {
        toDoData = JSON.parse(localStorage.getItem('toDoData'));
        render();
    }
});