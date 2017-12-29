import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import { CODE_APPROVED, CODE_CHANGED, ALERT_MESSAGE, FETCH_CODE } from './types';
//have to add it to types as well
//have to add it to index.js
//have to make reducer to handele AVAILABLE_CHANGED
// have add it to reducers/index.js

export const codeChanged = (text) => { //saves input to state
  return {
    type: CODE_CHANGED,
    payload: text
  };
};

export const fetchCode = () => { //retireves and saves stud code from user from firebase
  const userUID = firebase.auth().currentUser.uid;
  console.log('USERUID', userUID);
  const { ref } = firebase.database().ref(`users/${userUID}/code/code`);
  return (dispatch) => {
    //should change to once?
        ref.on('value', snapshot => {
          dispatch({ type: FETCH_CODE, payload: snapshot.val() });
      });
  };
};

export const addCode = ({ code }) => { //writes the code to user
  if (!validateInput(code)) { //calls function below to validate code
    return (dispatch) => {
    //dispatch({ type: QUEUE_CREATED_FAILED });
    errorAlert();
    };
  }

  //gets values to push to firebase
  return (dispatch) => {
    const userUID = firebase.auth().currentUser.uid;
    const { ref } = firebase.database().ref(`users/${userUID}/code`);

    ref.set({ code }) //sets the value
    .then(() => {
      dispatch({ type: CODE_APPROVED }); //resets the input field

       Alert.alert(
           'Code approved',
           'You are now free to use the student assistant functions. You will not need to enter the code again',
           [
             { text: 'Get started', onPress: () => Actions.pop() },
           ]
         );
     });
  };
};

const validateInput = (code) => { //gets input from the avaiable prop, and checks if it is on correct format
  if (code === '8825') {
    return true;
  }
  return false;
};

const errorAlert = () => { //function to show alert when entering worng code
  Alert.alert(
    'Wrong code',
    'Please enter the code provided by the professor',
    [
      { text: 'OK', onPress: () => Actions.signup() },
    ]
  );
};
