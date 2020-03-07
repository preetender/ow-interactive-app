export default {
	all: (state) =>
		state.items.map((event) => {
			const options = { hour: 'numeric', minute: 'numeric' };

			event.dates = {
				start_at: new Date(event.start_at).toLocaleDateString('pt-BR', options),
				end_at: new Date(event.end_at).toLocaleDateString('pt-BR', options)
			};

			return event;
		}),

	meta: (state) => state.meta
};
