import { STUDASS_COUNT_SUCCESSFULL, DELETE_QUEUE } from '../actions/types';

const INITIAL_STATE = { studasscount: 0 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STUDASS_COUNT_SUCCESSFULL:
    console.log(action);
      return { ...state, studasscount: action.payload };
    case DELETE_QUEUE:
    console.log(action);
      return INITIAL_STATE;
  default:
    return state;
  }
};
