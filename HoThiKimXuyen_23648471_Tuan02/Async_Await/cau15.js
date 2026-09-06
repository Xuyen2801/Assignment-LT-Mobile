// Exercise 15 (Promise style): call multiple async functions sequentially using .then chains
function multiplyByThree(n) {
	return new Promise((resolve) => setTimeout(() => resolve(n * 3), 1000));
}

multiplyByThree(2)
	.then((a) => {
		return multiplyByThree(a).then((b) => ({ a, b }));
	})
	.then(({ a, b }) => {
		console.log('sequentialExample ->', a, b);
	})
	.catch((err) => console.error(err))
	.finally(() => console.log('Done'));
