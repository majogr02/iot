const BASE_URL = '/api';
const MEDIA_TYPE = 'application/json';

export const service = {
	postUser: function(user) {
		return ajax('/users', 'POST', user)
			.then(response => response.ok || Promise.reject(response));
	},
	getTodos: function(user) {
		return ajax('/todos', 'GET', null, user)
			.then(response => response.ok ? response.json() : Promise.reject(response));
	},
	getTodo: function(id, user) {
		return ajax('/todos/' + id, 'GET', null, user)
			.then(response => response.ok ? response.json() : Promise.reject(response));
	},
	postTodo: function(todo, user) {
		return ajax('/todos', 'POST', todo, user)
			.then(response => response.ok ? response.json() : Promise.reject(response));
	},
	putTodo: function(todo, user) {
		return ajax('/todos/' + todo.id, 'PUT', todo, user)
			.then(response => response.ok ? response.json() : Promise.reject(response));
	},
	deleteTodo: function(id, user) {
		return ajax('/todos/' + id, 'DELETE', null, user)
			.then(response => response.ok || Promise.reject(response));
	}
};

function ajax(path, method, data, user) {
	let url = BASE_URL + path;
	let headers = getHeaders(method, user);
	let options = { method, headers };
	if (data) options.body = JSON.stringify(data);
	console.log(`Send ${method} request to ${url}`);
	return fetch(url, options);
}

function getHeaders(method, user) {
	let headers = {};
	if (method === 'GET') headers['Accept'] = MEDIA_TYPE;
	if (method === 'POST' || method === 'PUT') headers['Content-Type'] = MEDIA_TYPE;
	if (user) headers['Authorization'] = 'Basic ' + btoa(user.name + ':' + user.password);
	return headers;
}
