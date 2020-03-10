export default function({ store, route, redirect }) {
	const data = JSON.parse(window.localStorage.getItem('ow_interactive'));

	const { user: { token = null } } = data;

	// ir para login
	if (!token) {
		redirect('/');
	}

	console.log(data);

	// informar usuario logado.
	store.commit('user/set', data.user);
}
