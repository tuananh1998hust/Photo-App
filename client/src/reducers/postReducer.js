import {
  ADD_POST,
  POST_ERR,
  CLEAR_ERROR,
  GET_POSTS,
  LOAD_POSTS
} from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
  msg: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case POST_ERR:
      return {
        ...state,
        msg: action.payload.msg
      };

    case CLEAR_ERROR:
      return {
        ...state,
        msg: []
      };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };

    case LOAD_POSTS:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
