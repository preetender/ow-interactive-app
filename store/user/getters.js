export default {
	account: (state) => state.user,
	token: (state) => state.token,
	id: (state) => (state.user.hasOwnProperty('id') ? state.user.id : undefined)
};
