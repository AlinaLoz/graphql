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
      data: e
    });
  }
};

export const createBoard = (query) => async dispatch => {
  try {
    dispatch({type: ACTIONS.BOARD.CREATE.RQ});
    const data = await Xhr.apiCall({query, auth: true});
    dispatch({
      type:ACTIONS.BOARD.CREATE.SC,
      data: data
    })
  }catch(e) {
    return dispatch({
        type: ACTIONS.BOARD.CREATE.FL,
        data: e
      });
  }

};

// export const subscribeDropBoard = () => dispatch => {
//   on('drop-board', (data) => {
//     if (data.errors) {
//       return dispatch({
//         type: ACTIONS.BOARD.DROP.FL,
//         data: data.errors
//       });
//     }
//     dispatch({
//       type:ACTIONS.BOARD.DROP.SC,
//       data: data
//     })
//   })
// };
//
// export const emitDropBoard = (idBoard) => dispatch => {
//   dispatch({type: ACTIONS.BOARD.DROP.RQ});
//   emit('drop-board', {idBoard});
// };
//
export const dropMessage = (id) => dispatch => {
  dispatch({type: ACTIONS.BOARD.MESSAGE,});
};