import { GET_PROFILE, LOAD_PROFILE, UPDATE_AVATAR } from "../actions/types";

const initialState = {
  user: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    case LOAD_PROFILE:
      return {
        ...state,
        loading: true
      };

    case UPDATE_AVATAR:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}
