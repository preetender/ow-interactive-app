export default {
	formSelectUser: (state) => state.users.map((h) => ({ id: h.id, name: h.name }))
};
