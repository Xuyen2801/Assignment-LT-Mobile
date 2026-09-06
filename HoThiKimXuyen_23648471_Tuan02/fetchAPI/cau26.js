// Exercise 26: Use async/await with setTimeout to simulate a 5-second wait
// Run with: node cau26.js
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function () {
  console.log('Waiting 5 seconds...');
  await sleep(5000);
  console.log('5 seconds passed');
})();
