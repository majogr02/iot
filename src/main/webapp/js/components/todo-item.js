import { Component } from './component.js';
import { router } from '../router.js';
import { service } from '../service.js';
import { store } from '../store.js';

export class TodoItem extends Component {

	#todo;

	constructor(todo) {
		super('Todo Item', '', 'todo');
		this._load('todo-item.html').then(() => this.#init(todo));
	}

	#init(todo) {
		this.#todo = todo;
		this._interpolate(this.#todo);
		this._select('#delete').onclick = () => this.#deleteTodo();
	}

	#deleteTodo() {
		service.deleteTodo(this.#todo.id, store.getUser())
			.then(() => {
				store.removeTodo(this.#todo.id);
				router.navigate('/todo-list');
			})
			.catch(() => footer.innerHTML = 'Unexpected error');
	}
}
