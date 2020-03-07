export default {
	/**
   * @param {*} state
   * @param {*} source
   */
	set(state, source) {
		const { data, ...meta } = source;
		state.items = data;
		state.meta = meta;
	},

	/**
   * @param {*} state
   * @param {*} data
   */
	push(state, data) {
		state.items.push(data);
	},

	/**
   * @param {*} state
   * @param {*} data
   */
	update(state, data) {
		const current = state.items.find((h) => h.id == data.id);
		if (current) {
			// atualizar
			Object.assign(current, data);
		}
	},

	/**
   * @param {*} state
   * @param {*} event_id
   */
	remove(state, event_id) {
		const index = state.items.findIndex((h) => h.id == event_id);
		index > -1 && state.items.splice(index, 1);
	}
};
