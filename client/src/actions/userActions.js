import axios from "axios";
import { GET_PROFILE, LOAD_PROFILE, UPDATE_AVATAR } from "./types";

// Get User
export const getUser = id => dispatch => {
  dispatch({ type: LOAD_PROFILE });

  axios.get(`/api/users/${id}`).then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  );
};

// Update Avatar
export const updateAvatar = (id, formData) => dispatch => {
  axios.patch(`/api/posts/${id}/avatar`, formData).then(res =>
    dispatch({
      type: UPDATE_AVATAR,
      payload: res.data
    })
  );
};
