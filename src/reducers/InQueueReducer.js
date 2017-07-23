import { DELETED_ME_FROM_QUEUE, FOUND_MY_PLACE, QUIT } from '../actions/types';


const INITIAL_STATE = { place: 0, firstboolean: true, quit: false };

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
    default:
      return state;
  }
};
