export default function({ store, redirect }) {
	//
	const token = store.getters['user/token'];

	// ir para login
	if (!token) return redirect('/');
}
