// Exercise 27: fetchWithRetry(url, retries)
// Run with: node cau27.js
const fetchFn = (typeof fetch === 'function') ? fetch : (...args) => import('node-fetch').then(m => m.default(...args));

function fetchWithRetry(url, retries = 3, delay = 500) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      fetchFn(url)
        .then((res) => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(resolve)
        .catch((err) => {
          if (n <= 0) return reject(err);
          setTimeout(() => attempt(n - 1), delay);
        });
    };
    attempt(retries);
  });
}

fetchWithRetry('https://jsonplaceholder.typicode.com/todos/1', 3)
  .then((data) => console.log('fetchWithRetry ->', data))
  .catch((err) => console.error('Final error ->', err))
  .finally(() => console.log('Done'));
