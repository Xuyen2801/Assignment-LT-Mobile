// Exercise 18 (Promise style): fetchUser(id) simulates API call resolving after 1s
function fetchUser(id) {
	return new Promise((resolve) => setTimeout(() => resolve({ id, name: `User${id}` }), 1000));
}

fetchUser(1)
	.then((user) => console.log('fetchUser ->', user))
	.catch((err) => console.error(err))
	.finally(() => console.log('Done'));
