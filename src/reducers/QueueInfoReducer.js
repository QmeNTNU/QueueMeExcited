import { INFO_RETIREVED, ADDED_TO_QUEUE } from '../actions/types';


const INITIAL_STATE = { subject: '', studass: '', available: '', count: '', myLocation: '' };

//compact way of taking in a parameter and adding it to varieble states above
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INFO_RETIREVED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ADDED_TO_QUEUE:
      return { ...state, ...INITIAL_STATE, myLocation: action.payload };
    default:
      return state;
  }
};
