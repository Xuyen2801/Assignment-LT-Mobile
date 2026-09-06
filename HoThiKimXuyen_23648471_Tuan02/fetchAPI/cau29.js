// Exercise 29: queueProcess() processes tasks sequentially in a queue
// Run with: node cau29.js
function task(n, ms = 500) {
  return new Promise((resolve) => setTimeout(() => resolve(`task${n}-done`), ms));
}

async function queueProcess(tasks) {
  const results = [];
  for (const t of tasks) {
    // await each task sequentially
    // t is a function that returns a promise
    const r = await t();
    console.log('Processed ->', r);
    results.push(r);
  }
  return results;
}

const tasks = [() => task(1, 300), () => task(2, 400), () => task(3, 200)];

queueProcess(tasks)
  .then((res) => console.log('queueProcess finished ->', res))
  .catch((err) => console.error(err));
