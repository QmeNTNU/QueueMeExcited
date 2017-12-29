import firebase from 'firebase';
import {
  FAVORITEASSSUBJECTLIST_FETCH_SUCCESS
} from './types';

/*
Oppsumert hva som skjer
oppdaterer, lager og henter fag i "favorittlisten" når logget inn som studass
*/


export const favoriteAssSubjectListFetch = () => {
  const userUID = firebase.auth().currentUser.uid;
  return (dispatch) => {
    firebase.database().ref(`/users/${userUID}/favasssubject`)
      .on('value', snapshot => {
        dispatch({ type: FAVORITEASSSUBJECTLIST_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
