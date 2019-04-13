import {ACTIONS} from "../constans";
import {Xhr} from "../../helpers/Xhr";

export const fetchLogin = (login, password) => async dispatch => {
	try {
		const auth = await Xhr.apiCall({url: `/login?login=${login}&password=${password}`, method: 'GET'});
		console.log(auth);
		dispatch({
			type: ACTIONS.USER.LOGIN.SC,
			data: auth
		})
	} catch (e) {
		dispatch({
			type: ACTIONS.USER.LOGIN.FL,
			data: e.data
		})
	}
};

export const fetchAuth = (query) => async dispatch => {
	if (!localStorage.getItem('token')) {
		dispatch(logOut());
		return;
	}
	try {
	  const data = await Xhr.apiCall({query, auth: true});
	  dispatch({
			type: ACTIONS.USER.AUTH,
			data: data.data.auth
		})
	} catch (e) {
		console.log(e);
		localStorage.removeItem('token');
	}
};

export const logOut = () => dispatch => {
	localStorage.removeItem('token');
};


