import { LOADING,
  FAVORITESTUDENTSUBJECTLIST_FETCH_SUCCESS,
  ADDED_TO_QUEUE,
  STUDASSLIST_FETCH_SUCCESS
   } from '../actions/types';


const INITIAL_STATE = { loading: false };

//compact way of taking in a parameter and adding it to varieble states above
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case FAVORITESTUDENTSUBJECTLIST_FETCH_SUCCESS:
      return INITIAL_STATE;
    case ADDED_TO_QUEUE:
      return INITIAL_STATE;
    case STUDASSLIST_FETCH_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};