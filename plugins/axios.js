export default function({ $axios, redirect }) {
	$axios.onRequest((config) => {
		console.log('Making request to ' + config.url);
	});

	$axios.onError((error) => {
		const { statusText, status, data } = error.response;

		// personalizar casos
		const errors = [];

		if ([ 400, 401, 403 ].includes(status)) {
			errors.push(data);
		}

		if (typeof data === 'object') {
			Object.keys(data).forEach((key) => errors.push(data[key][0]));
		}

		return Promise.reject({ statusText, status, errors, data });
	});
}
