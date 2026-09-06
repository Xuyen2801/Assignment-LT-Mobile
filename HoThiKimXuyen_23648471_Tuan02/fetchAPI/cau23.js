// Exercise 23: Fetch list of todos and filter completed ones
// Run with: node cau23.js
const url = 'https://jsonplaceholder.typicode.com/todos';
const fetchFn = (typeof fetch === 'function') ? fetch : (...args) => import('node-fetch').then(m => m.default(...args));

fetchFn(url)
  .then((res) => res.json())
  .then((todos) => todos.filter((t) => t.completed))
  .then((completed) => {
    console.log('Completed todos count:', completed.length);
    console.log(completed.slice(0, 10));
  })
  .catch((err) => console.error(err))
  .finally(() => console.log('Done'));
