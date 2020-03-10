import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
	window.onNuxtReady(() => {
		new VuexPersistence({
			key: 'ow_interactive'
		}).plugin(store);
	});
};
