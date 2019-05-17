import axios from "axios";

import {
  ADD_POST,
  POST_ERR,
  CLEAR_ERROR,
  LOAD_POSTS,
  GET_POSTS
} from "./types";

// Add New Post
export const addPost = newPost => dispatch => {
  axios
    .post("/api/posts", newPost)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });

      dispatch({ type: CLEAR_ERROR });
    })
    .catch(err =>
      dispatch({
        type: POST_ERR,
        payload: err.response.data
      })
    );
};

// Get All Posts
export const getPosts = () => dispatch => {
  dispatch({ type: LOAD_POSTS });

  axios.get("/api/posts").then(res =>
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  );
};
