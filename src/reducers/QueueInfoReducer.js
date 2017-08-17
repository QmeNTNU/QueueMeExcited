import { INFO_RETIREVED, ADDED_TO_QUEUE, DELETE_QUEUE, SET_PLAYERID } from '../actions/types';


const INITIAL_STATE = { subject: '', studass: '', available: '', room: '', studassLocation: '', count: '', myLocation: '', playerId: '' };

//compact way of taking in a parameter and adding it to varieble states above
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INFO_RETIREVED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ADDED_TO_QUEUE:
      return { ...state, myLocation: action.payload };
    case DELETE_QUEUE:
      return INITIAL_STATE;
      case SET_PLAYERID:
      return { ...state, playerId: action.payload };

    default:
      return state;
  }
};
