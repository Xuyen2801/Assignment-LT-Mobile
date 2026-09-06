// Exercise 17 (Promise style): iterate over array of promises and log results
function multiplyByThree(n) {
	return new Promise((resolve) => setTimeout(() => resolve(n * 3), 1000));
}

const promises = [multiplyByThree(4), multiplyByThree(5), multiplyByThree(6)];

Promise.all(promises)
	.then((results) => {
		results.forEach((val) => console.log('forAwaitExample value ->', val));
	})
	.catch((err) => console.error(err))
	.finally(() => console.log('Done'));
