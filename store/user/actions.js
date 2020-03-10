export default {
	/**
   * @param {*} store
   * @param {*} credentials
   */
	login(store, credentials) {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await this.$axios.post('login', credentials);
				const { data } = response;
				store.commit('set', data);
				this.$router.push('/dashboard');
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	},

	/**
   * @param {*} store
   * @param {*} form
   */
	update(store, form) {
		return new Promise(async (resolve, reject) => {
			const { token } = store.state;
			try {
				this.$axios.setToken(token, 'Bearer');
				const response = await this.$axios.put('/api/user', form);
				const { data } = response;
				store.commit('update', data);
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	},

	/**
   * @param {*} store
   */
	logout(store) {
		store.commit('reset');
		// redirecionar
		setTimeout(() => this.$router.push('/'), 1000);
	}
};
