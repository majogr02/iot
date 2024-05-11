import { Component } from './component.js';
import { router } from '../router.js';
import { service } from '../service.js';
import { store } from '../store.js';

export class EditTodo extends Component {

	#todo = {};

	constructor(id) {
		super('Edit Todo');
		this._load('edit-todo.html').then(() => this.#init(id));
	}

	#init(id) {
		let todo = store.getTodo(id);
		if (todo) {
			Object.assign(this.#todo, todo);
			this._bind(this.#todo);
			this._select('#save').onclick = () => this.#updateTodo();
		} else {
			footer.innerHTML = `Todo ${id} not found`;
		}
	}

	#updateTodo() {
		let form = this._select('form');
		if (!form.reportValidity()) return;
		service.putTodo(this.#todo, store.getUser())
			.then(todo => {
				store.updateTodo(todo);
				router.navigate('/todo-list');
			})
			.catch(() => footer.innerHTML = 'Unexpected error');
	}
}
