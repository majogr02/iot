const routes = {};

export const router = {
	register: function(path, Component, guard) {
		console.log(`Register component with path ${path}`);
		routes[path] = { Component, guard };
	},
	navigate: function(path) {
		if (location.hash === '#' + path)
			navigate(path);
		else location.hash = path;
	}
};

window.onhashchange = () => navigate(location.hash.replace('#', ''));

function navigate(path) {
	console.log(`Navigate to path ${path}`);
	let [name, parameter] = path.split('/').splice(1);
	let route = routes['/' + name];
	if (route && (!route.guard || route.guard()))
		show(route.Component, parameter);
	else router.navigate('/');
}

function show(Component, parameter) {
	console.log(`Show component ${Component.name}`);
	footer.innerHTML = '';
	let component = new Component(parameter);
	document.title = component.getTitle();
	main.replaceChildren(component.getView());
}
