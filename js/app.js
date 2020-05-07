import page from 'page';
import checkConnectivity from './network.js';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todo.js';
import { setTodos, getTodos, deleteTodoIDB } from './idb.js';

checkConnectivity({});
document.addEventListener('connection-changed', async e => {
  let root = document.documentElement;
  document.offline = !e.detail;
  if (e.detail) {
    let todosIDB = await getTodos();
    //let todosJSONserver = await fetchTodos();
    console.log(todosIDB);
    //console.log(todosJSONserver);
    todosIDB.map(todoIDB => {
      if(!todoIDB.isSync){
        createTodo({...todoIDB, isSync: true});
      }
      if(todoIDB.isDeleted){
        deleteTodo(todoIDB.id);
        deleteTodoIDB(todoIDB.id);
        return;
      }
      if(todoIDB.isUpdate){
        updateTodo({...todoIDB, isUpdate: false});
      }
    })
  } else {
    console.log('Connection interrupted');
  }
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

      Todo(app, data);
      /*el.addEventListener('create-todo', async ({ detail }) => {
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
      });*/
      /*const result = await fetch('http://localhost:3000/todos', {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },
      });
      const data = await result.json();*/
    });

    page('/todos/edit/:id', async (req) => {
      console.log(req.params.id);
      const module = await import('./views/EditTodo.js');
      const EditTodo = module.default;

      EditTodo(app);
    });

    page();
});