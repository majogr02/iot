import { router } from './router.js';
import { store } from './store.js';
import { Login } from './components/login.js';
import { TodoList } from './components/todo-list.js';
import { NewTodo } from './components/new-todo.js';
import { EditTodo } from './components/edit-todo.js';
import { Logout } from './components/logout.js';

router.register('/', Login);
router.register('/login', Login);
router.register('/todo-list', TodoList, isLoggedIn);
router.register('/new-todo', NewTodo, isLoggedIn);
router.register('/edit-todo', EditTodo, isLoggedIn);
router.register('/logout', Logout, isLoggedIn);

if (location.hash)
	router.navigate(location.hash.replace('#', ''))
else router.navigate('/');

function isLoggedIn() {
	return store.getUser() != null;
}
