import {
  STUDASSLIST_FETCH_SUCCESS
} from '../actions/types';

/*
Oppsummert hva som skjer
setter state i liste over tilgjengelige studasser
*/
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case STUDASSLIST_FETCH_SUCCESS:
      return action.payload;

    default:
    return state;
  }
};
