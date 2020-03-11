export default {
	findUsers(store) {
		return new Promise(async (resolve, reject) => {
			try {
				const { token } = store.rootState.user;

				this.$axios.setToken(token, 'Bearer');

				const response = await this.$axios.get('api/users');

				store.commit('set', response.data);
				resolve();
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
};
