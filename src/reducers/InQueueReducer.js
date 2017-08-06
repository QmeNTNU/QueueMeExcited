import { DELETED_ME_FROM_QUEUE, FOUND_MY_PLACE, QUIT, SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/types';


const INITIAL_STATE = { place: 0, firstboolean: true, quit: false, showNotification: '' };

//compact way of taking in a parameter and adding it to varieble states above
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETED_ME_FROM_QUEUE:
      return state;
     case FOUND_MY_PLACE:
     console.log(action);
      return { ...state, place: action.payload, firstboolean: false };
      case QUIT:
       return { ...state, quit: true };
    case SHOW_NOTIFICATION:
        console.log(action);
        return { ...state, showNotification: 'show' };
    case HIDE_NOTIFICATION:
        console.log(action);
        return { ...state, showNotification: '' };
    default:
      return state;
  }
};
