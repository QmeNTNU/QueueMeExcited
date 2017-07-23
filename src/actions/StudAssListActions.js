import {
  STUDASSLIST_FETCH_SUCCESS,
  LOADING
} from './types';

/*
Oppsumert hva som skjer
oppdaterer,lager og henter student assistenter til liste over studentassistenter i hvert fag
*/
export const studAssListFetch = ({ ref }) => {

  return (dispatch) => {
    dispatch({ type: LOADING }); //Starts loading

        ref.on('value', snapshot => {
      dispatch({ type: STUDASSLIST_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};
/*
export const studAssListUpdate = ({ prop, value }) => {
  return {
    type: STUDASS_UPDATE,
    payload: { prop, value }
  };
};


export const studAssCreate = ({ studentAssistant }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/subjects/${currentUser.uid}/studAssList`)
    .push({ studentAssistant })
    .then(() => {
      dispatch({ type: STUDASS_CREATE });
      Actions.studAssList({ type: 'reset' });
    });
  };
};
*/
