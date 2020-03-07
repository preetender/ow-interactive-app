import VuexPersist from 'vuex-persist';
export default ({ store }) => new VuexPersist({ key: 'ow_interactive' }).plugin(store);
