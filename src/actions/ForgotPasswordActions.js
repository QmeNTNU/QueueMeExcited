import firebase from 'firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    RESET_EMAIL_CHANGE,
    RESET_PASSWORD_PRESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS
} from './types';

export const resetEmailChange = (text) => {
  return {
      type: RESET_EMAIL_CHANGE,
      payload: text
  };
};

export const resetPasswordButtonPress = ({ resetEmail }) => {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD_PRESS });

    firebase.auth().sendPasswordResetEmail(resetEmail)
     .then(() => sendResetPasswordSuccess(dispatch))
     .catch(() => sendResetPasswordFailed(dispatch));
  };
};

const sendResetPasswordFailed = (dispatch) => {
  dispatch({ type: RESET_PASSWORD_FAILED });
  Alert.alert(
      'RESET PASSWORD FAILED',
      'Make sure you enter an existing email',
      [
        { text: 'OK', onPress: () => Actions.forgotPassword() },
      ]
    );
};

const sendResetPasswordSuccess = (dispatch) => {
  dispatch({ type: RESET_PASSWORD_SUCCESS });
  Alert.alert(
      'EMAIL SENT',
      'If not recieved within a couple' +
      ' of minutes, make sure you entered the correct email and try again',
      [
        { text: 'OK', onPress: () => Actions.login() },
      ]
    );
};
