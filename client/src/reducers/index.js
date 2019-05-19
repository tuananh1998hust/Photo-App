import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

export default combineReducers({
  account: accountReducer,
  post: postReducer,
  user: userReducer
});
