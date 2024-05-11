import { Component } from './component.js';
import { TodoItem } from './todo-item.js';
import { router } from '../router.js';
import { store } from '../store.js';

export class TodoList extends Component {

	static #template = `
		<h1>Todo List</h1>
		<div id="list"></div>
		<a id="new-todo" class="button primary">New Todo</a>
	`;

	constructor() {
		super('Todo List', TodoList.#template);
		let todos = store.getTodos();
		this.#renderTodos(todos);
		this._select('#new-todo').onclick = () => router.navigate('/new-todo');
	}

	#renderTodos(todos) {
		let list = this._select('#list');
		if (todos.length === 0)
			list.innerHTML = 'No todos available';
		else todos.forEach(todo => {
			let item = new TodoItem(todo);
			list.append(item.getView());
		});
	}
}
