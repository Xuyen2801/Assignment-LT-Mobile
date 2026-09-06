// Exercise 13 (Promise style): reject a Promise after 1s and handle with .catch
function rejectAfter(time) {
	return new Promise((_, reject) => {
		setTimeout(() => reject(new Error('Something went wrong (async)')), time);
	});
}

rejectAfter(1000)
	.then(() => {
		console.log('This will not run');
	})
	.catch((err) => {
		console.error('errorExample caught ->', err.message);
	})
	.finally(() => {
		console.log('Done');
	});
