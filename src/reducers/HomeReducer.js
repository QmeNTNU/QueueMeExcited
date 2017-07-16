import {
  STUDENT,
  STUDASS
} from '../actions/types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case STUDENT:
        return { ...state, INITIAL_STATE };
      case STUDASS:
        return { ...state, INITIAL_STATE };
      default:
        return state;
    }
};
