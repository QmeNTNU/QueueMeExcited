import {
  SUBJECTASS_UPDATE,
  SUBJECTASS_CREATE
} from '../actions/types';

/*
Oppsummert hva som skjer
Styrer staten i legg-til-fag skjemaet for studass
*/


//initierer state til tomt objekt
//dette er standard, kan kopieres fra reducer til reducer
const INITIAL_STATE = {};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SUBJECTASS_UPDATE:
      //action.payload === { prop: name: '', value: 'jane' }
    return { ...state, [action.payload.prop]: action.payload.value };

    case SUBJECTASS_CREATE:
      return INITIAL_STATE; //fordi vil tilbake til "start" når vi har laget fag


    default:
      return state;
  }
};

//[action.payload.prop] er ikke en array, men keyinterprelation(?)
// endrer seg, nøkkel som vi legger til objektet vil bli bestemt under runtime
