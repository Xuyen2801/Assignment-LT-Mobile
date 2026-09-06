// Exercise 16 (Promise style): run multiple promises in parallel with Promise.all
function multiplyByThree(n) {
	return new Promise((resolve) => setTimeout(() => resolve(n * 3), 1000));
}

Promise.all([multiplyByThree(1), multiplyByThree(2), multiplyByThree(3)])
	.then((results) => {
		console.log('parallelExample ->', results);
	})
	.catch((err) => console.error(err))
	.finally(() => console.log('Done'));
