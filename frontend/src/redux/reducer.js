import auth from "./auth/reducer";
import register from "./register/reducer";
import {combineReducers} from "redux";
import teams from "./teams/reducer";
import board from "./board/reducer";

export default combineReducers({
	auth,
	register,
	teams,
	board
});