//action creator are functions
//must return an action
//an action is an object with a 'type' property

//with redux-thunk:
//must return an function, this funtion will be called with an 'dispatch'

import firebase from 'firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNUP,
  FORGOT_PASSWORD
 } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
      type: PASSWORD_CHANGED,
      payload: text
  };
};

//setter {} rundt email og password fordi vi forventer et objekt
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};

export const signup = () => {
  return (dispatch) => {
    dispatch({ type: SIGNUP });
    Actions.signup();
};
};

export const forgotPasswordClick = () => {
  return (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD });
    Actions.forgotPassword();
};
};

//export foran gjør at metodene kan brukes i andre klasse
//disse metodene er bare hjelpemetoder
const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
  Alert.alert(
      'LOG IN FAILED',
      'Make sure your email and password are correct',
      [
        { text: 'OK', onPress: () => Actions.login() },
      ]
    );
};

const loginUserSuccess = (dispatch, user) => {
  //const { currentUser } = firebase.auth();
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
 Actions.homePage();
 // hvis du endrer passordet (har glemt det) må det oppdateres i dataasen
 // firebase.database().ref(`/users/${currentUser.uid}/userInfo/${signupPassword}`)
 //        .set({ password });
};
