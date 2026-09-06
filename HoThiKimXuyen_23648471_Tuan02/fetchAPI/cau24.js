// Exercise 24: postData() sends a POST request to a test API
// Run with: node cau24.js
const url = 'https://jsonplaceholder.typicode.com/posts';
const fetchFn = (typeof fetch === 'function') ? fetch : (...args) => import('node-fetch').then(m => m.default(...args));

const postData = (data) => {
  return fetchFn(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

postData({ title: 'foo', body: 'bar', userId: 1 })
  .then((res) => console.log('POST response ->', res))
  .catch((err) => console.error(err))
  .finally(() => console.log('Done'));
