import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  LOGIN_FAIL,
  CLEAR_ERROR
} from "../actions/types";

const initialState = {
  loading: true,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  msg: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        msg: action.payload.msg
      };

    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        msg: []
      };

    case CLEAR_ERROR:
      return {
        ...state,
        msg: []
      };

    default:
      return state;
  }
}
