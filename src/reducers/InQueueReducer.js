import { DELETED_ME_FROM_QUEUE, FOUND_MY_PLACE, QUIT, SHOW_NOTIFICATION, HIDE_NOTIFICATION, SHOW_NOTIFICATION_2 } from '../actions/types';


const INITIAL_STATE = { place: 0, firstboolean: true, quit: false, showNotification: '', showNotification2: '' };

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
  case SHOW_NOTIFICATION_2:
      console.log(action);
      return { ...state, showNotification2: 'show' };
    case HIDE_NOTIFICATION:
        console.log(action);
        return { ...state, showNotification: '', showNotification2: '' };
    default:
      return state;
  }
};
