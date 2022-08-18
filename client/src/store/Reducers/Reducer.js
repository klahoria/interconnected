import { combineReducers } from "redux";
import Auth from "./Auth/Auth";

const reducer = combineReducers({
  auth: Auth,
});

export default reducer;
