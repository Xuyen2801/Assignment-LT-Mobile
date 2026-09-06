// Exercise 19 (Promise style): fetchUsers(ids) that calls fetchUser for each ID
function fetchUser(id) {
	return new Promise((resolve) => setTimeout(() => resolve({ id, name: `User${id}` }), 1000));
}

function fetchUsers(ids) {
	const promises = ids.map((id) => fetchUser(id));
	return Promise.all(promises);
}

fetchUsers([1, 2, 3])
	.then((users) => console.log('fetchUsers ->', users))
	.catch((err) => console.error(err))
	.finally(() => console.log('Done'));
