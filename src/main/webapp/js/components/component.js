const TEMPLATES_ROOT = 'templates/';

export class Component {

	#title;
	#view;

	constructor(title, template = '', styleClass = '') {
		this.#title = title;
		this.#view = document.createElement('div');
		this.#view.innerHTML = template;
		this.#view.className = styleClass;
	}

	getTitle() {
		return this.#title;
	}

	getView() {
		return this.#view;
	}

	_load(templatePath) {
		return fetch(TEMPLATES_ROOT + templatePath)
			.then(response => response.ok ? response.text() : Promise.reject(response))
			.then(template => this.#view.innerHTML = template)
			.catch(() => footer.innerHTML = `Template ${templatePath} not found`);
	}

	_bind(model) {
		this.#view.querySelectorAll('input[data-model]').forEach(element => {
			let property = element.getAttribute('data-model');
			if (model[property]) element.value = model[property];
			element.oninput = () => model[property] = element.value;
		});
	}

	_interpolate(model) {
		this.#view.innerHTML = this.#view.innerHTML
			.replace(/{{(\w+)}}/g, (placeholder, property) => model[property] || '');
	}

	_select(selector) {
		return this.#view.querySelector(selector);
	}
}
