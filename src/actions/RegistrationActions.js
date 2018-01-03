import firebase from 'firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  SIGNUP_EMAIL_CHANGED,
  SIGNUP_PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  FULLNAME_CHANGED,
  GENDER_CHANGED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  PASSWORD_WRONG,
  SHORT_PASSWORD,
  SELECT_GENDER,
  FULLNAME_WRONG,
  EMAIL_WRONG,
  EMPTY_PASSWORD,
  CREATE_USER,
  LOGIN

} from './types';

export const fullnameChanged = (text) => {
  return {
    type: FULLNAME_CHANGED,
    payload: text
  };
};

export const SignupEmailChanged = (text) => {
  return {
    type: SIGNUP_EMAIL_CHANGED,
    payload: text
  };
};

export const SignupPasswordChanged = (text) => {
  return {
      type: SIGNUP_PASSWORD_CHANGED,
      payload: text
  };
};

export const confirmPasswordChanged = (text) => {
  return {
      type: CONFIRM_PASSWORD_CHANGED,
      payload: text
  };
};

export const genderUpdate = (gender) => {
  return {
      type: GENDER_CHANGED,
      payload: gender
  };
};

// alle metodene ovenfor er for å lagre textinput som skrives ved å bruke
// RegReducer.

export const login = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN });
    Actions.login();
};
};

export const createUser = ({ signupEmail, signupPassword, confirmPassword, fullname, gender }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    fullnameValidation({
      dispatch, signupEmail, signupPassword, confirmPassword, fullname, gender });
  };
};

const fullnameValidation =
  ({ dispatch, signupEmail, signupPassword, confirmPassword, fullname, gender }) => {
    if (fullname.split(' ').length === 1) {
      fullnameError(dispatch);
    } else {
        matchingPasswordValidation({
           dispatch, signupEmail, signupPassword, confirmPassword, fullname, gender });
    }
  };
const matchingPasswordValidation =
  ({ dispatch, signupEmail, signupPassword, confirmPassword, fullname, gender }) => {
    if (signupPassword === '') {
      emptyPasswordError(dispatch);
    } else if (signupPassword.length < 6) {
      shortPassword(dispatch);
    } else if (signupPassword === confirmPassword) {
      selectedGenderValidation({ dispatch, signupEmail, signupPassword, fullname, gender });
    } else {
      passwordError(dispatch);
    }
};

const selectedGenderValidation =
  ({ dispatch, signupEmail, signupPassword, fullname, gender }) => {
      if (gender === 'male' || gender === 'female') {
        emailValidation({ dispatch, signupEmail, signupPassword, fullname, gender });
      } else if (gender === '') {
        genderError({ dispatch, signupEmail, signupPassword, fullname, gender });
      }
  };

const emailValidation =
({ dispatch, signupEmail, signupPassword, fullname, gender }) => {
    // U can register as a student at HIOA and NTNU
    if (signupEmail.includes('stud.ntnu.no') || signupEmail.includes('stud.hioa.no')) {
      userValidation({ dispatch, signupEmail, signupPassword, fullname, gender });
    } else {
      // CAN NOT HAVE ({}) IF EMAILERROR USES DISPATCH DIRECTLY APPERANTLY!!!!
      emailError(dispatch, signupEmail, signupPassword, fullname, gender);
    }
};

const userValidation = ({ dispatch, signupEmail, signupPassword, fullname, gender }) => {
  //dispatch er en metode (funksjon)
    firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then(user =>
      //sets name to firebase user
        user.updateProfile({ displayName: fullname }))
      .then(user =>
        createUserSuccess(dispatch, user, signupEmail, signupPassword, fullname, gender))
        .catch(() => createUserFail(dispatch));
};

const createUserSuccess = (dispatch, user, signupEmail, signupPassword, fullname, gender) => {
  dispatch({
    type: CREATE_USER_SUCCESS,
    payload: user
  });
  createUserInFireBase(signupEmail, signupPassword, fullname, gender);
  Actions.homePage();
};


const createUserInFireBase = (signupEmail, signupPassword, fullname, gender) => {
  // const emnekode = 'TDT4105'; HIOA DOES NOT NEED MATLAB OR ANY SUBJECTS
  // const emnenavn = 'ITGK Matlab';
  const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
      .set({ fullname, gender });
};


const fullnameError = (dispatch) => {
  dispatch({
    type: FULLNAME_WRONG
  });
  Alert.alert(
      'REGISTRATION FAILED',
      'Please enter both your firstname and lastname',
      [
        { text: 'OK', onPress: () => Actions.signup() },
      ]
    );
};
const emptyPasswordError = (dispatch) => {
  dispatch({
      type: EMPTY_PASSWORD
  });
  Alert.alert(
      'REGISTRATION FAILED',
      'Please enter a password',
      [
        { text: 'OK', onPress: () => Actions.signup() },
      ]
    );
};
const shortPassword = (dispatch) => {
  dispatch({
      type: SHORT_PASSWORD
  });
  Alert.alert(
      'REGISTRATION FAILED',
      'Your password must be longer than, or equal to, 6 charcters',
      [
        { text: 'OK', onPress: () => Actions.signup() },
      ]
    );
};
const passwordError = (dispatch) => {
  dispatch({
    type: PASSWORD_WRONG
  });
  Alert.alert(
      'REGISTRATION FAILED',
      'Make sure your passwords are equal',
      [
        { text: 'OK', onPress: () => Actions.signup() },
      ]
    );
};

const genderError = ({ dispatch, signupEmail, signupPassword, fullname, gender }) => {
  dispatch({
      type: SELECT_GENDER
  });
  Alert.alert(
      'GENDER RECOMMENDED!',
      'Are you sure want to register without your gender? If you add gender, the studass/students can more easily recognize you!',
      [

        { text: 'Back', onPress: () => Actions.signup() },
          { text: 'Register without gender', onPress: () => RegisterWithoutGender({ dispatch, signupEmail, signupPassword, fullname, gender }) }
      ]
    );
};
const RegisterWithoutGender = ({ dispatch, signupEmail, signupPassword, fullname, gender }) => {

  dispatch({ type: CREATE_USER });
  emailValidation({ dispatch, signupEmail, signupPassword, fullname, gender });
};

const createUserFail = (dispatch) => {
  dispatch({
    type: CREATE_USER_FAIL
  });
  Alert.alert(
      'REGISTRATION FAILED',
      'Your entered email may already be in use, or the connection was lost',
      [
        { text: 'OK', onPress: () => Actions.signup() },
      ]
    );
};

const emailError = (dispatch) => {
  dispatch({
    type: EMAIL_WRONG
  });
  Alert.alert(
      'REGISTRATION FAILED',
      'Your email must contain "stud.ntnu.no"',
      [
        { text: 'Continue', onPress: () => Actions.signup() },
      ]
    );
};
