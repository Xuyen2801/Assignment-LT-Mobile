
function simulateTask(time) {
	return new Promise((resolve) => setTimeout(() => resolve('Task done'), time));
}

simulateTask(2000)
	.then((result) => {
		console.log('callSimulateTask ->', result);
	})
	.catch((err) => {
		console.error(err);
	})
	.finally(() => {
		console.log('Done');
	});
