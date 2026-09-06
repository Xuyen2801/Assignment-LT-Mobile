// Exercise 14 (Promise style): wait 1s and return n * 3
function multiplyByThree(n) {
	return new Promise((resolve) => setTimeout(() => resolve(n * 3), 1000));
}

multiplyByThree(5)
	.then((res) => console.log('multiplyByThree ->', res))
	.catch((err) => console.error(err))
	.finally(() => console.log('Done'));
