export default function Todo(page) {
    page.innerHTML = '';
    const constructor = document.createElement('div');
    constructor.innerHTML = `
        <section name="Todo">
        <h1>My awesome todo :</h1>
        <section class="todolist">
            <ul></ul>
        </section>
        </section>
    `;

    const view = constructor
        .querySelector('[name="Todo"]')
        .cloneNode(true);

    page.appendChild(view);


    /** add */
   /*  const todo = {
        id: Date.now(),
        title: input.value,
        synced: false,
        updated: false,
        done: false,
        date: Date.now()
      };
  
      const event = new CustomEvent('create-todo', { detail: todo });
      view.dispatchEvent(event);*/
}