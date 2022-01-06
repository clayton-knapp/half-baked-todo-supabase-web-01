export function renderTodo(eachTodoObj) {
    // create a div and a p tag
    const p = document.createElement('p');
    const div = document.createElement('div');

    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    if (eachTodoObj.complete === true) {
        div.classList.add('complete');
    } else {
        div.classList.add('incomplete');
    }

    // add the 'todo' css class no matter what
    div.classList.add('todo');

    // put the todo's text into the p tag
    p.textContent = eachTodoObj.todo;

    // append stuff
    div.append(p);

    // return the div
    return div; 
}