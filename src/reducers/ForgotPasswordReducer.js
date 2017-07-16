import {
  RESET_EMAIL_CHANGE,
  RESET_PASSWORD_PRESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  resetEmail: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_EMAIL_CHANGE:
        return { ...state, resetEmail: action.payload };
    case RESET_PASSWORD_PRESS:
        return { ...state, ...INITIAL_STATE };
    case RESET_PASSWORD_FAILED:
        return { ...state, ...INITIAL_STATE };
    case RESET_PASSWORD_SUCCESS:
          return { ...state, ...INITIAL_STATE };
    default:
        return state;
  }
};
