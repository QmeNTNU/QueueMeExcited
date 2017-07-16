import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  ADDSUBJECTSTUDENT_UPDATE,
  ADDSUBJECTSTUDENT_CREATE,
  ADDSUBJECTLISTSTUDENT_FETCH_SUCCESS
} from './types';

/*
Oppsummert hva som skjer
for å hente liste fra firebase, av mulige fag å velge i statisk liste
brukes ikke for øyeblikket, har bare ventet med å slette
*/

export const addSubjectStudentUpdate = ({ prop, value }) => {
  return {
    type: ADDSUBJECTSTUDENT_UPDATE,
    payload: { prop, value }
  };
};

export const addSubjectListStudentFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/FavoriteAssSubject`)
      .on('value', snapshot => {
        dispatch({ type: ADDSUBJECTLISTSTUDENT_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
