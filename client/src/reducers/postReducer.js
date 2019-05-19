import {
  ADD_POST,
  POST_ERR,
  CLEAR_ERROR,
  GET_POSTS,
  LOAD_POSTS,
  ADD_CMT,
  DELETE_POST,
  DELETE_CMT,
  LIKE_POST
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

    case ADD_CMT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.payload.id) {
            post = action.payload.data;
          }

          return post;
        })
      };

    case LOAD_POSTS:
      return {
        ...state,
        loading: true
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };

    case DELETE_CMT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.payload.id) {
            post = action.payload.data;
          }

          return post;
        })
      };

    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.payload.id) {
            post = action.payload.data;
          }

          return post;
        })
      };

    default:
      return state;
  }
}
