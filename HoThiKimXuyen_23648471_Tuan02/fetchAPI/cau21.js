// Exercise 21: Use fetch to get data from a public API
// Run with: node cau21.js

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// If running on Node 18+ fetch is global. Otherwise install node-fetch.
const fetchFn = (typeof fetch === 'function') ? fetch : (...args) => import('node-fetch').then(m => m.default(...args));

fetchFn(url)
  .then((res) => res.json())
  .then((data) => {
    console.log('Todo:', data);
  })
  .catch((err) => console.error('Fetch error:', err))
  .finally(() => console.log('Done'));
