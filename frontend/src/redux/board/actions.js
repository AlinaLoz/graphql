import {ACTIONS} from "../constans";
import {Xhr} from "../../helpers/Xhr";

export const getBoards = (query) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.GET_ALL.RQ});
    const data = await Xhr.apiCall({query, auth: true});
    dispatch({
      type: ACTIONS.BOARD.GET_ALL.SC,
      data: data.data.getBoards
    })
  } catch (e) {
    dispatch({
      type: ACTIONS.BOARD.GET_ALL.FL,
      data: e.message
    });
  }
};

export const createBoard = (query) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.CREATE.RQ});
    const data = await Xhr.apiCall({query, auth: true});
    dispatch({
      type:ACTIONS.BOARD.CREATE.SC,
      data: data.data.createBoard
    })
  }catch(e) {
    return dispatch({
        type: ACTIONS.BOARD.CREATE.FL,
        data: e.message
      });
  }
};

export const dropBoard = (query) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.DROP.RQ});
    const data = await Xhr.apiCall({query, auth: true});
    dispatch({
      type:ACTIONS.BOARD.DROP.SC,
      data: data.data.dropBoard
    })
  }catch(e) {
    return dispatch({
      type: ACTIONS.BOARD.CREATE.FL,
      data: e.message
    });
  }
};

export const dropMessage = (id) => dispatch => {
  dispatch({type: ACTIONS.BOARD.MESSAGE,});
};