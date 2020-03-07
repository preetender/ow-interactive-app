export default {
	/**
   * @param {*} store
   * @param {*} filter
   */
	async find(store, data = {}) {
		const { filter = 'all', paginate = 10, page = 1 } = data;
		const { token } = store.rootState.user;
		//
		this.$axios.setToken(token, 'Bearer');

		const response = await this.$axios.get(`/api/events?q=${filter}&paginate=${paginate}&page=${page}`);

		// adicionar na loja
		store.commit('set', response.data);
	},

	/**
   * @param {*} store
   * @param {*} data
   */
	create(store, data) {
		const { token } = store.rootState.user;
		return new Promise(async (resolve, reject) => {
			this.$axios.setToken(token, 'Bearer');

			try {
				const response = await this.$axios.post(`/api/events`, data);

				store.commit('push', response.data);

				resolve();
			} catch (error) {
				reject(error);
			}
		});
	},

	/**
   * @param {*} store
   * @param {*} data
   */
	update(store, data) {
		const { token } = store.rootState.user;
		return new Promise(async (resolve, reject) => {
			this.$axios.setToken(token, 'Bearer');

			try {
				const response = await this.$axios.put(`/api/events/${data.id}`, data);

				store.commit('update', response.data);

				resolve();
			} catch (error) {
				reject(error);
			}
		});
	},

	/**
   * @param {*} store
   * @param {*} event_id
   */
	destroy(store, event_id) {
		const { token } = store.rootState.user;
		return new Promise(async (resolve, reject) => {
			this.$axios.setToken(token, 'Bearer');

			try {
				const response = await this.$axios.delete(`/api/events/${event_id}`);

				// remover
				store.commit('remove', event_id);

				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}
};
