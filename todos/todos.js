import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

// DOM ELEMENTS
const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');


//EVENT LISTENERS

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', async()=>{
    await fetchAndDisplayTodos();
});

todoForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    // on submit, create a todo, reset the form, and display the todos
    const data = new FormData(todoForm);
    const newTodo = data.get('todo');

    await createTodo(newTodo);

    await fetchAndDisplayTodos();

    todoForm.reset();
});

deleteButton.addEventListener('click', async() => {
    // delete all todos
    await deleteAllTodos();

    // then refetch and display the updated list of todos
    await fetchAndDisplayTodos();

});

// FUNCTIONS

async function fetchAndDisplayTodos() {
    // fetch the todos - its an array of objects
    const todos = await getTodos();

    // display the list of todos
    todosEl.textContent = '';

    for (let eachTodoObj of todos) {
        const todoEl = renderTodo(eachTodoObj);

        // be sure to give each todo an event listener
        todoEl.addEventListener('click', async()=> {
            // on click, complete that todo
            await completeTodo(eachTodoObj.id);

            // recall the fetchAndDisplay Function
            await fetchAndDisplayTodos();

        });
    

        todosEl.append(todoEl);
    }

}






logoutButton.addEventListener('click', () => {
    logout();
});


