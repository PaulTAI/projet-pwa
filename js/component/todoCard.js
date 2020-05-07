export default function TodoCard(todos, async = false) {
    /*function deleteItem() {
      console.log("zd")
    }
  
    function updateItem() {
      todo.done = todo.done === 'true'  ? 'false' : 'true';
      const event = new CustomEvent('update-todo', { detail: todo });
      document.dispatchEvent(event);
    }*/

    return todos.map(todo => {
        return `
          <div id="item-${todo.id}" class="todo-item flex space-between ${todo.done ? "item-checked" : null}">
            <div class="flex column">
              <p>
                ${todo.title}
              </p>
              <p>
                ${todo.content}
              </p>
            </div>
            <div class="modif-item flex column">
              <input type="checkbox" data-action="check" class="action-item check-item" data-item="${todo.id}" ${todo.done ? "checked" : null}/>
              <button data-item="${todo.id}" data-action="modif" class="action-item modif-item">
                Modifier
              </button>
              <button data-item="${todo.id}" data-action="delete" class="action-item delete-item">
                Supprimer
              </button>
            </div>
          </div>
        `
    }).join("");
}