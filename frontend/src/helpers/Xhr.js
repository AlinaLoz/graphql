const BASE_URL = 'http://localhost:4000';
const GRAPHQL_URL = '/graphql';



class Xhr {
	static buildHeaders(auth) {
		let headers = {};
		headers['Content-type'] = 'application/json';
    if (auth) {
      // headers['Content-type'] = 'application/graphql';
			headers['Authorization'] = localStorage.getItem('token');
		}
		return headers;
	}

	static apiCall({query, url = GRAPHQL_URL, method='POST', auth}) {
		const options = {
			method,
			mode: 'cors',
			headers: this.buildHeaders(auth),
		};
		if (url.indexOf('login') === -1  && url.indexOf('register') === -1) {
			options.body = JSON.stringify({query});
		}
		return fetch(BASE_URL + url, options)
		.then(resp => resp.json())
		.then(data => {
			if (data.errors) throw new Error(data.errors);
			return data;
		})
    .catch(err => {
			console.log(err);
			return err;
		});
	}
}

export {Xhr};