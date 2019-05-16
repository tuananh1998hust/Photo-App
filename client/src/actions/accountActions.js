import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR,
  CLEAR_ERROR
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  axios
    .get("/api/auth")
    .then(res =>
      dispatch({
        type: LOAD_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: AUTH_ERROR
      })
    );
};

// Login User
export const loginUser = formLogin => dispatch => {
  axios
    .post("/api/auth", formLogin)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch({ type: CLEAR_ERROR });

      dispatch(loadUser());
    })
    .catch(err =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data
      })
    );
};

// Register User
export const register = formRegister => dispatch => {
  axios
    .post("/api/users/register", formRegister)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch({ type: CLEAR_ERROR });
    })
    .catch(err =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      })
    );
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
