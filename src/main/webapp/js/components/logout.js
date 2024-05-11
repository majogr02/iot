import { Component } from './component.js';
import { store } from '../store.js';

export class Logout extends Component {

	static #template = `
		<h1>Logout</h1>
		<p>You have successfully logged out</p>
	`;

	constructor() {
		super('Logout', Logout.#template);
		store.clear();
		nav.innerHTML = '<a href="#/">Home</a>';
	}
}
