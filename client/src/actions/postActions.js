import axios from "axios";

import {
  ADD_POST,
  POST_ERR,
  CLEAR_ERROR,
  LOAD_POSTS,
  GET_POSTS,
  ADD_CMT,
  DELETE_POST,
  DELETE_CMT,
  LIKE_POST
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

// Add Cmt
export const addCmt = (newCmt, postId) => dispatch => {
  axios.post(`/api/posts/${postId}/cmt`, newCmt).then(res =>
    dispatch({
      type: ADD_CMT,
      payload: {
        id: postId,
        data: res.data
      }
    })
  );
};

// Delete Post
export const deletePost = id => dispatch => {
  axios.delete(`/api/posts/${id}`).then(res =>
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  );
};

// Delete Cmt
export const deleteCmt = (postId, cmtId) => dispatch => {
  axios.delete(`/api/posts/${postId}/cmt/${cmtId}`).then(res =>
    dispatch({
      type: DELETE_CMT,
      payload: {
        id: postId,
        data: res.data
      }
    })
  );
};

// Like Post & Unlike Post
export const likePost = id => dispatch => {
  axios.post(`/api/posts/${id}/like`).then(res =>
    dispatch({
      type: LIKE_POST,
      payload: {
        id,
        data: res.data
      }
    })
  );
};
