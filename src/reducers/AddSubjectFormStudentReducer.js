import {
  SUBJECTSTUDENT_UPDATE,
  SUBJECTSTSTUDENT_CREATE
} from '../actions/types';

/*
Oppsummert hva som sjer
Styrer staten i legg-til-fag skjemaet som student
*/


const INITIAL_STATE3 = {};

export default (state = INITIAL_STATE3, action) => {
  switch (action.type) {
    case SUBJECTSTUDENT_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SUBJECTSTSTUDENT_CREATE:
      return INITIAL_STATE3;
    default:
      return state;
  }
};
