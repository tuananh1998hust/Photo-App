import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import postReducer from "./postReducer";

export default combineReducers({
  account: accountReducer,
  post: postReducer
});
