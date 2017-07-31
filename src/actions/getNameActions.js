
import firebase from 'firebase';
import {
  GET_MY_NAME,
  GET_MY_GENDER,
  FIRST_TIME
 } from './types';


export const getMyName = () => {
  const userUID = firebase.auth().currentUser.uid;
  console.log('USERUID', userUID);
  const { ref } = firebase.database().ref(`users/${userUID}/fullname`);
  return (dispatch) => {
        ref.on('value', snapshot => {
          dispatch({ type: GET_MY_NAME, payload: snapshot.val().toString() });
      });
  };
};

export const getMyGender = () => {
  const userUID = firebase.auth().currentUser.uid;
  const { ref } = firebase.database().ref(`users/${userUID}/gender`);
  return (dispatch) => {
        ref.on('value', snapshot => {
          dispatch({ type: GET_MY_GENDER, payload: snapshot.val().toString() });
      });
  };
};

export const setFirstTime = (text) => {
  return {
    type: FIRST_TIME,
    payload: text
  };
};
