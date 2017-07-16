import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  SUBJECTASS_UPDATE,
  SUBJECTASS_CREATE,
  FAVORITEASSSUBJECTLIST_FETCH_SUCCESS
} from './types';

/*
Oppsumert hva som skjer
oppdaterer, lager og henter fag i "favorittlisten" når logget inn som studass
*/

export const subjectAssUpdate = ({ prop, value }) => {
  return {
    type: SUBJECTASS_UPDATE,
    payload: { prop, value }

  };
};

//legger til data i databasen
//få tilgang til firebase.database, lokasjon hvor vi lagrer dataen
//referanse til subjects-favoriteAss..
//const currentUser er nåværende authenticaded user
//pusher subject til /users/blalla/
//then() går tilbake til Subjects skjermen med key favoriteAss...
//må bruke dispatch for å komme helt tilbake til start

export const subjectAssCreate = ({ subject }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/favoriteAssSubjectList`)
    .push({ subject })
    .then(() => {
      dispatch({ type: SUBJECTASS_CREATE });
      Actions.favoriteAssSubjectList({ type: 'reset' });
    });
  };
};

//henter data fra databasen
//bruker samme referanse, men henter ut data denne gangen
export const favoriteAssSubjectListFetch = () => {
  //henter aksess til currentUser
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/favoriteAssSubjectList`)
      .on('value', snapshot => {
        dispatch({ type: FAVORITEASSSUBJECTLIST_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
