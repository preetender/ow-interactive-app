export default {
	/**
   * @param {*} state
   * @param {*} data
   */
	set(state, data) {
		const { token, user } = data;
		state.user = user;
		state.token = token;
	},

	/**
   * @param {*} state
   * @param {*} changes
   */
	update(state, changes) {
		Object.assign(state.user, changes);
	},

	/**
   * @param {*} state
   */
	reset(state) {
		state.account = null;
		state.token = null;
	}
};
