import firebase from 'firebase';
import {
  FAVORITESTUDENTSUBJECTLIST_FETCH_SUCCESS,
  LOADING
} from './types';

/*
Oppsumert hva som skjer
oppdaterer, lager og henter fag i favorittlisten når logget inn som student
*/

export const favoriteStudentSubjectListFetch = () => {
  const userUID = firebase.auth().currentUser.uid;

  return (dispatch) => {
    dispatch({ type: LOADING });

    firebase.database().ref(`/users/${userUID}/favstudsubject`)
      .on('value', snapshot => {
        dispatch({ type: FAVORITESTUDENTSUBJECTLIST_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
