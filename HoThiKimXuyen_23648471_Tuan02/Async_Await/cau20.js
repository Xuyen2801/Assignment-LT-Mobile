// Exercise 20 (Promise style): API call with timeout (reject if > 2s)
function withTimeout(promise, ms) {
	const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout after ' + ms + 'ms')), ms));
	return Promise.race([promise, timeout]);
}

function fetchUserWithTimeout(id) {
	const apiCall = new Promise((resolve) => {
		const delay = 500 + Math.floor(Math.random() * 2500);
		setTimeout(() => resolve({ id, name: `User${id}`, delay }), delay);
	});

	return withTimeout(apiCall, 2000);
}

fetchUserWithTimeout(1)
	.then((user) => console.log('fetchUserWithTimeout ->', user))
	.catch((err) => console.error('fetchUserWithTimeout error ->', err.message))
	.finally(() => console.log('Done'));
