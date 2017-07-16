import {
  ADDSUBJECTLISTSTUDENT_FETCH_SUCCESS
} from '../actions/types';

/*
Oppsumert hva som skjer
Brukes ikke
lagd for å ha en dynamisk liste over fag som er mulige å velge hvis det
legges til flere fag i firebase
*/

const INITIAL_STATE4 = {};

export default (state = INITIAL_STATE4, action) => {
  switch (action.type) {
    case ADDSUBJECTLISTSTUDENT_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
