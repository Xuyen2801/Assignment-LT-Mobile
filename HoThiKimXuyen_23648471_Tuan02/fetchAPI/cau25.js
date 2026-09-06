// Exercise 25: downloadFile simulates downloading a file in 3 seconds
// Run with: node cau25.js
function downloadFile() {
  return new Promise((resolve) => {
    console.log('Start downloading...');
    setTimeout(() => resolve('Download complete'), 3000);
  });
}

downloadFile()
  .then((msg) => console.log(msg))
  .catch((err) => console.error(err))
  .finally(() => console.log('Done'));
