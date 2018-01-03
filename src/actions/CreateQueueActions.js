import firebase from 'firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AVAILABLE_CHANGED, ROOM_CHANGED, QUEUE_CREATED, QUEUE_CREATED_FAILED, LOADING_BUTTON, STUD_SUBJECT, CHECK_IF_EXIST } from './types';


export const availableChanged = (text) => { //saves the available text to state and displays it in input
  return {
    type: AVAILABLE_CHANGED,
    payload: text
  };
};

export const roomChanged = (text) => { //saves the room text to state and displays it in input
  return {
    type: ROOM_CHANGED,
    payload: text
  };
};

export const studassSubject = (text) => {
  return {
    type: STUD_SUBJECT,
    payload: text
  };
};

export const checkIfExists = (ref) => { //checks if the user has a queue on this ref from before
  return (dispatch) => {
    ref.once('value', snapshot => {
      dispatch({ type: CHECK_IF_EXIST, payload: snapshot.val() });

    });
  };
};

export const makeQueue = ({ myGender, available, room, ref, exist, playerId }) => {
  //calls function below to validate "available" input.
  if (!validateInput(available)) { //if not valid --> cancel creation
    return (dispatch) => {
    dispatch({ type: QUEUE_CREATED_FAILED });
    errorAlert(); //calls function below to show alert
    };
  }
  //

  //gets all values needed to create the queue
  const fullname = firebase.auth().currentUser.displayName;
  const userGender = myGender;
  const userUID = firebase.auth().currentUser.uid;
  const userEmail = firebase.auth().currentUser.email;
  const userPlayerId = playerId;
  //

  // check if the user already has a queue at this ref
  if (exist !== '' && exist !== null && exist !== undefined) { //if queue exist
    return (dispatch) => {

    Alert.alert(
      'Queue already exists',
      'You already have a queue in this subject. Do you want to go to the existing queue or override it with the new?',
        [
          { text: 'Override', onPress: () => {
                                                dispatch({ type: LOADING_BUTTON });//sets spinner

                                                ref.set({ fullname, userEmail, available, room, userUID, userGender, userPlayerId }) //sets the value
                                                .then(() => {
                                                  dispatch({ type: QUEUE_CREATED }); //resets the input field
                                                   Actions.studassQueue({ type: 'reset' });//moved to necht scene
                                                 });
                                              } },
          { text: 'Go to existing', onPress: () =>  Actions.studassQueue({ type: 'reset' }) }
        ]
    );
  };
  }
  //

  //Queue doesent exist from before so we create a new one and send user to Studassqueue.js
  return (dispatch) => {
    dispatch({ type: LOADING_BUTTON });//sets spinner

    ref.set({ fullname, userEmail, available, room, userUID, userGender, userPlayerId }) //sets the value
    .then(() => {
      dispatch({ type: QUEUE_CREATED }); //resets the input field
       Actions.studassQueue({ type: 'reset' });//moved to necht scene
     });
  };
  //
};
//////////////////////////////////////////////////////////////////////////////////////
/*Thought for improving the preformans in the queuemaking:
but is difficult because i have to keep track of key, easier to just stay with useruid
return (dispatch) => {
  dispatch({ type: LOADING });//sets spinner
  const newRef = ref.push();
  //gets  the key to this location
  const key = newRef.key;
  //sets a value to the retrieved location
  //saved the key to be used in next scene. sets other to initial_state
  newRef.set({ userEmail, available, room, userUID, userGender }) //sets the value
  .then(() => {
    dispatch({ type: QUEUE_CREATED }); //resets the input field
    dispatch({ type: MY_LOCATION, payload: key });
     Actions.queue();//moved to necht scene
   });
};
};*/
///////////////////////////////////////////////////////////////////////////////////////////

const validateInput = (text) => { //gets input from the avaiable prop, and checks if it is on correct format
if (text.length < 5) {
  return false;
}
if (text.charAt(2) !== ':') {
  return false;
}
if (text.charAt(0) > 2) {
  return false;
}
if (text.charAt(0) > 1 && text.charAt(1) > 3) {
  return false;
}
if (text.charAt(3) > 5) {
  return false;
}
return true;
};

const errorAlert = () => { //Function that shows alert when validation fails
  Alert.alert(
    'Unvalid input',
    'Make sure you write the hourmark as 00:00.',
      [
        { text: 'OK', onPress: () => Actions.createQueue() },
      ]
  );
};
