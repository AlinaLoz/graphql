import {Xhr} from "../../helpers/Xhr";
import {ACTIONS} from "../constans";

export const getTeams = (query) => async dispatch => {
    try {
        dispatch({type: ACTIONS.TEAM.GET.RQ});
        const data = await Xhr.apiCall({query, auth: true});
        dispatch({
            type: ACTIONS.TEAM.GET.SC,
            data: data.data.teamAll
        })
    } catch (e) {
        dispatch({
            type: ACTIONS.TEAM.GET.FL,
            data: e.message
        })
    }
};

export const checkExistUser = (query) => async dispatch => {
    try {
        dispatch({type: ACTIONS.TEAM.USER_TEST.RQ});
        const data = await Xhr.apiCall({query, auth: true});
        dispatch({
            type: ACTIONS.TEAM.USER_TEST.SC,
            data: data.data.checkUser,
        })
    } catch (e) {
        dispatch({
            type: ACTIONS.TEAM.USER_TEST.FL,
            data: e.message
        })
    }
};

export const createTeam = (query) => async dispatch => {
    try {
        dispatch({type: ACTIONS.TEAM.CREATE.RQ});
        const data = await Xhr.apiCall({query, auth: true});
        dispatch({
            type: ACTIONS.TEAM.CREATE.SC,
            data: data.data.createTeam
        })
    } catch (e) {
        dispatch({
            type: ACTIONS.TEAM.CREATE.FL,
            data: e.message
        })
    }
};

export const dropTeam = (query) => async dispatch => {
    try {
        dispatch({type: ACTIONS.TEAM.DROP.RQ});
        const data = await Xhr.apiCall({query, auth: true});
        dispatch({
            type: ACTIONS.TEAM.DROP.SC,
            data: data.data.dropTeam
        })
    } catch (e) {
        dispatch({
            type: ACTIONS.TEAM.DROP.FL,
            data: e.message
        })
    }
};

export const getOneTeam = (query) => async dispatch => {
    try {
        const data = await Xhr.apiCall({query, auth: true});
        const {users, name, id} = data.data.getOneTeam;
        dispatch({
            type: ACTIONS.ONE_TEAM.GET.SC,
            data: {users, name},
            id
        })
    } catch (e) {
        dispatch({
            type: ACTIONS.ONE_TEAM.GET.FL,
            data: e.message
        })
    }
};

export const updateName = (query) => async dispatch => {
    try {
        const data = await Xhr.apiCall({query, auth: true});
        console.log(data);
        dispatch({
            type: ACTIONS.ONE_TEAM.UPDATE_NAME.SC,
            data: data.data.updateNameTeam
        })
    } catch (e) {
        dispatch({
            type: ACTIONS.ONE_TEAM.UPDATE_NAME.FL,
            data: e.message
        })
    }
};

export const dropMessage = (id) => dispatch => {
    dispatch({type: ACTIONS.TEAM.MESSAGE});
};