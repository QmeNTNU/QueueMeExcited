import {
  LOGOUT,
  DELETE_USER,
  CANCEL
} from '../actions/types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    case DELETE_USER:
      return { ...state, ...INITIAL_STATE };
    case CANCEL:
      return { ...state, ...INITIAL_STATE };
    default:
        return state;
  }
};
