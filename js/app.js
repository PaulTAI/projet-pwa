import page from '/node_modules/page/page.mjs';

const app = document.querySelector('#app .outlet');

page('/todos', async () => {
  const module = await import('./views/Todo.js');
  const Todo = module.default;

  Todo(app);

  const result = await fetch('http://localhost:3000/todos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await result.json();
});

page();