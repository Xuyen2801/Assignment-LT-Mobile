// Exercise 22: Call the API multiple times and log the results
// Run with: node cau22.js
const ids = [1, 2, 3];
const base = 'https://jsonplaceholder.typicode.com/todos/';
const fetchFn = (typeof fetch === 'function') ? fetch : (...args) => import('node-fetch').then(m => m.default(...args));

Promise.all(ids.map((id) => fetchFn(base + id).then((r) => r.json())))
  .then((results) => {
    console.log('Results:');
    results.forEach((r) => console.log(r));
  })
  .catch((err) => console.error(err))
  .finally(() => console.log('Done'));
