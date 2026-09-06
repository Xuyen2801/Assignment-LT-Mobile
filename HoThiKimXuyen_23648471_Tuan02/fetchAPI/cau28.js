// Exercise 28: batchProcess() processes 5 async tasks at once (Promise.all)
// Run with: node cau28.js
function task(n, ms = 1000) {
  return new Promise((resolve) => setTimeout(() => resolve(`task${n}-done`), ms));
}

Promise.all([task(1, 500), task(2, 800), task(3, 300), task(4, 1000), task(5, 200)])
  .then((results) => console.log('batchProcess results ->', results))
  .catch((err) => console.error(err))
  .finally(() => console.log('Done'));
