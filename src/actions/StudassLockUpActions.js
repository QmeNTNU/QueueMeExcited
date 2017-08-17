import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import { CODE_APPROVED, CODE_CHANGED, ALERT_MESSAGE, FETCH_CODE } from './types';
//have to add it to types as well
//have to add it to index.js
//have to make reducer to handele AVAILABLE_CHANGED
// have add it to reducers/index.js
export const codeChanged = (text) => {
  return {
    type: CODE_CHANGED,
    payload: text
  };
};

export const fetchCode = () => {
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

export const addCode = ({ code }) => {
  //MUST HAVE VALIDATION////////////////////////////////////
  if (!validateInput(code)) {
    return (dispatch) => {
    //dispatch({ type: QUEUE_CREATED_FAILED });
    errorAlert();
    };
  }

  //gets rest of values on should push to the location
  return (dispatch) => {
    //dispatch({ type: LOADING_BUTTON });//sets spinner
    const userUID = firebase.auth().currentUser.uid;
    const { ref } = firebase.database().ref(`users/${userUID}/code`);

    ref.set({ code }) //sets the value
    .then(() => {
      dispatch({ type: CODE_APPROVED }); //resets the input field
       //Actions.studassQueue({ type: 'reset' });//moved to necht scene
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

const validateInput = (code) => {
  console.log(code);
//gets input from the avaiable prop, and checks if it is on correct format
if (code === '8825') {
  return true;
}

return false;
};

const errorAlert = () => {
//Getscalled when it tries to retrieve data but doesent fint it
Alert.alert(
    'Wrong code',
    'Please enter the code provided by the professor',
    [
      { text: 'OK', onPress: () => Actions.signup() },
    ]
  );

};
