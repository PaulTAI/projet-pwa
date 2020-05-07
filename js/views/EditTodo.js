import page from 'page';
import { getTodos, setTodo, unsetTodo, deleteTodoIDB, checkTodoIDB } from '../idb';
import { deleteTodo, createTodo, updateTodo } from '../api/todo';

export default async function EditTodo(EditToDoPage) {
    EditToDoPage.innerHTML = '';
    //lastId = 
    const constructor = document.createElement('div');
    constructor.innerHTML = `
        <section name="EditTodo">
            <h1>Edit my awesome todo :</h1>
            <button id="cta-back">Retour</button>
        </section>
    `;

    const view = constructor
        .querySelector('[name="EditTodo"]')
        .cloneNode(true);

    EditToDoPage.appendChild(view);

    document.getElementById("cta-back").addEventListener("click", function(e){
        page("/todos");
        e.preventDefault();
    })
}