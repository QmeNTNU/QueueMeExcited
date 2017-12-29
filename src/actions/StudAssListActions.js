import {
  STUDASSLIST_FETCH_SUCCESS,
  LOADING
} from './types';

/*
Oppsumert hva som skjer
oppdaterer,lager og henter student assistenter til liste over studentassistenter i hvert fag
*/

export const studAssListFetch = ({ ref }) => { //retrives and save studasses at ref to state
  return (dispatch) => {
    dispatch({ type: LOADING }); //Starts loading

        ref.on('value', snapshot => {
      dispatch({ type: STUDASSLIST_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};
