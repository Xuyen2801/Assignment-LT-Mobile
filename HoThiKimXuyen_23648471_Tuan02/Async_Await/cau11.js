// Exercise 11 (Promise style): return "Hello Async" after 2 seconds
new Promise((resolve) => setTimeout(() => resolve('Hello Async'), 2000))
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.error(err);
	})
	.finally(() => {
		console.log('Done');
	});


