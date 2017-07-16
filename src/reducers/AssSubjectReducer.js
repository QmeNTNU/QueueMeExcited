import {
  FAVORITEASSSUBJECTLIST_FETCH_SUCCESS
} from '../actions/types';

/*
Oppsummert hva som skjer
Setter state i fagene til studass
*/

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FAVORITEASSSUBJECTLIST_FETCH_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};


// {...state, [id]: action.payload } holder track på dataen din med id-approach
