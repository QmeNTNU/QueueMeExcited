
import firebase from 'firebase';
import {
  GET_MY_NAME
 } from './types';


export const getMyName = () => {
  const userUID = firebase.auth().currentUser.uid;
  const { ref } = firebase.database().ref(`users/${userUID}/fullname`);
  return (dispatch) => {
        ref.on('value', snapshot => {
          dispatch({ type: GET_MY_NAME, payload: snapshot.val().toString() });
      });
  };
};
