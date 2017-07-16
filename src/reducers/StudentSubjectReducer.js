import {
  FAVORITESTUDENTSUBJECTLIST_FETCH_SUCCESS
} from '../actions/types';

/*
Oppsummert hva som skjer
setter state i fagene til student
*/

const INITIAL_STATE3 = {};

export default (state = INITIAL_STATE3, action) => {
  switch (action.type) {
    case FAVORITESTUDENTSUBJECTLIST_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
