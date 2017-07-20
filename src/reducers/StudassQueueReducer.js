import { QUEUE_FETCH_SUCCESS, DELETE_QUEUE } from '../actions/types';


const INITIAL_STATE = { };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUEUE_FETCH_SUCCESS:
    console.log('queue', action);
      return action.payload; //puts all the objects in the initial state object
//    case CHILD_ADDED:
//      return { ...state, arr: state.arr.concat(action.payload) };
    case DELETE_QUEUE:
      return INITIAL_STATE;
  default:
    return state;
  }
};
