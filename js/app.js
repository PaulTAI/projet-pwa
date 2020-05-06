import page from '/node_modules/page/page.mjs';
import checkConnectivity from './network.js';
import { fetchTodos, createTodo } from './api/todo.js';
import { setTodos, setTodo, getTodos } from './idb.js';

checkConnectivity({});
document.addEventListener('connection-changed', e => {
  let root = document.documentElement;
  document.offline = !e.detail;
  // if (e.detail) {
  //   root.style.setProperty('--app-blue', '#007eef');
  //   // console.log('Back online');
  // } else {
  //   root.style.setProperty('--app-blue', '#7D7D7D');
  //   // console.log('Connection too slow');
  // }
});

fetch('/config.json')
  .then((result) => result.json())
  .then((config) => {
    console.log('[todo] Config loaded !!!');
    window.config = config;

    const app = document.querySelector('#app .outlet');

    page('/todos', async () => {
    const module = await import('./views/Todo.js');
    const Todo = module.default;

    const data = await getTodos();


    let todos = [];
    if (!document.offline) {
      const data = await fetchTodos();
      todos = await setTodos(data);
    } else {
      todos = await getTodos();
    }


    const el = Todo(app, data);
    el.addEventListener('create-todo', async ({ detail }) => {
        console.log(detail)
        await setTodo(detail);
        if (!document.offline) {
          const result = await createTodo(detail);
          if (result !== false) {
            detail.synced = true;
            await setTodo(detail);
          }
        } else {
          console.log('[todo] Todo created offline');
        }
    });
    /*const result = await fetch('http://localhost:3000/todos', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    const data = await result.json();*/
    });

    page();
});