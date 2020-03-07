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
	}
};
