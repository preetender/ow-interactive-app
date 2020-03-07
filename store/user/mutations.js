export default {
	/**
   * @param {*} state
   * @param {*} data
   */
	set(state, data) {
		console.log(data);
		const { token, user: account } = data;
		state.account = account;
		state.token = token;
	}
};
