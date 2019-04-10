import {ACTIONS} from "../constans";
import {Xhr} from "../../helpers/Xhr";

export const fetchLogin = (login, password) => async dispatch => {
	// dispatch({type: ACTIONS.USER.LOGIN.RQ});
	//
	// Xhr.login(login, password).then(resp => {
	// 	dispatch({
	// 		type: ACTIONS.USER.LOGIN.SC,
	// 		data: resp
	// 	})
	// }).catch(err => {
	// 	dispatch({
	// 		type: ACTIONS.USER.LOGIN.FL,
	// 		data: err.data
	// 	})
	// });
	try {
		const auth = await Xhr.apiCall({login, password}, 'post');
		dispatch({
			type: ACTIONS.USER.AUTH,
			data: auth
		})
	} catch (e) {
		dispatch({
			type: ACTIONS.USER.LOGIN.FL,
			data: e.data
		})
	}
};


export const fetchAuth = () => async dispatch => {
	if (!localStorage.getItem('token')) {
		dispatch(logOut());
		return;
	}
	try {
		const auth = await Xhr.apiCall({}, 'post', localStorage.getItem('token'));
		dispatch({
			type: ACTIONS.USER.AUTH,
			data: auth
		})
	} catch (e) {
		localStorage.removeItem('token');
	}
};

export const logOut = () => dispatch => {
	localStorage.removeItem('token');
};


