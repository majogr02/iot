import { Component } from './component.js';
import { router } from '../router.js';
import { service } from '../service.js';
import { store } from '../store.js';

export class Login extends Component {

	#user = {};

	constructor() {
		super('Login');
		this._load('login.html').then(() => this.#init());
	}

	#init() {
		nav.innerHTML = '';
		this._bind(this.#user);
		this._select('#login').onclick = () => this.#loginUser();
		this._select('#register').onclick = () => this.#registerUser();
	}

	#loginUser() {
		let form = this._select('form');
		if (!form.reportValidity()) return;
		service.getTodos(this.#user)
			.then(todos => this.#setupUser(todos))
			.catch(error => footer.innerHTML = error.status === 401 ? 'Invalid credentials' : 'Unexpected error');
	}

	#registerUser() {
		let form = this._select('form');
		if (!form.reportValidity()) return;
		service.postUser(this.#user)
			.then(() => this.#setupUser([]))
			.catch(error => footer.innerHTML = error.status === 409 ? 'User already exists' : 'Unexpected error');
	}

	#setupUser(todos) {
		store.setUser(this.#user);
		store.setTodos(todos);
		nav.innerHTML = `User ${this.#user.name} | <a href="#/logout">Logout</a>`;
		router.navigate('/todo-list');
	}
}
