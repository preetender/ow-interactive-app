import colors from 'vuetify/es5/util/colors';

export default {
	mode: 'spa',
	/*
  ** Headers of the page
  */
	head: {
		title: 'OW Interactive - Eventos',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } ]
	},
	/*
  ** Customize the progress-bar color
  */
	loading: { color: '#fff' },
	/*
  ** Global CSS
  */
	css: [],
	/*
  ** Plugins to load before mounting the App
  */
	plugins: [
		{ src: '~/plugins/axios', ssr: false },
		{ src: '~/plugins/vuex', ssr: false },
		{ src: '~/plugins/vuelidate', ssr: false }
	],
	/*
  ** Nuxt.js dev-modules
  */
	buildModules: [ '@nuxtjs/vuetify' ],
	/*
  ** Nuxt.js modules
  */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios'
	],
	/*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
	axios: {
		baseURL: 'http://ow-interactive.local',
		common: {
			Accept: 'application/json',
			'X-Requested-With': 'XMLHttpRequest'
		}
	},
	/*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
	vuetify: {
		customVariables: [ '~/assets/variables.scss' ],
		theme: {
			light: true,
			themes: {
				light: {
					primary: '#000'
				}
			}
		}
	},
	/*
  ** Build configuration
  */
	build: {
		/*
    ** You can extend webpack config here
    */
		extend(config, ctx) {}
	}
};
