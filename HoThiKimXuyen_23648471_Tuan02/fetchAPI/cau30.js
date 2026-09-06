// Exercise 30: Use Promise.allSettled() to handle multiple API calls and display status
// Run with: node cau30.js
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/INVALID_URL', // will return 404
  'https://invalid.domain.test/should-fail', // network error
];
const fetchFn = (typeof fetch === 'function') ? fetch : (...args) => import('node-fetch').then(m => m.default(...args));

Promise.allSettled(urls.map((u) => fetchFn(u).then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))))
  .then((results) => {
    results.forEach((res, idx) => {
      if (res.status === 'fulfilled') {
        console.log(`URL ${urls[idx]} -> SUCCESS`, res.value);
      } else {
        console.log(`URL ${urls[idx]} -> FAILED`, res.reason && res.reason.message);
      }
    });
  })
  .catch((err) => console.error(err))
  .finally(() => console.log('Done'));
