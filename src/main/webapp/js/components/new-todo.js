import { Component } from './component.js';
import { router } from '../router.js';
import { service } from '../service.js';
import { store } from '../store.js';

export class NewTodo extends Component {

	#todo = {};

	constructor() {
		super('New Todo');
		this._load('new-todo.html').then(() => this.#init());
	}

	#init() {
		this._bind(this.#todo);
		this._select('#save').onclick = () => this.#addTodo();
	}

	#addTodo() {
		let form = this._select('form');
		if (!form.reportValidity()) return;
		service.postTodo(this.#todo, store.getUser())
			.then(todo => {
				store.addTodo(todo);
				router.navigate('/todo-list');
			})
			.catch(() => footer.innerHTML = 'Unexpected error');
	}
}
