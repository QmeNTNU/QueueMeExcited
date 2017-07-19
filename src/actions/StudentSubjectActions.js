import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  SUBJECTSTUDENT_UPDATE,
  SUBJECTSTUDENT_CREATE,
  FAVORITESTUDENTSUBJECTLIST_FETCH_SUCCESS
} from './types';

/*
Oppsumert hva som skjer
oppdaterer, lager og henter fag i favorittlisten når logget inn som student
*/

export const subjectStudentUpdate = ({ prop, value }) => {
  return {
    type: SUBJECTSTUDENT_UPDATE,
    payload: { prop, value }
  };
};

export const subjectStudentCreate = ({ subject }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/favoriteStudentSubjectList`)
      .push({ subject })
      .then(() => {
        dispatch({ type: SUBJECTSTUDENT_CREATE });
        Actions.favoriteStudentSubjectList({ type: 'reset' });
      });
  };
};

export const favoriteStudentSubjectListFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/favoriteStudentSubjectList`)
      .on('value', snapshot => {
        dispatch({ type: FAVORITESTUDENTSUBJECTLIST_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const subjectStudentDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/favoriteStudentSubjectList/${uid}`)
      .remove()
      .then(() => {
        Actions.favoriteStudentSubjectList({ type: 'reset' });
      });
  };
};
