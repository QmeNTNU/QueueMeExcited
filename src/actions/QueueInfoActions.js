import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { INFO_RETIREVED, ADDED_TO_QUEUE } from './types';

export const setInfo = ({ prop, value }) => {
  //VALIDAITON
  return {
    type: INFO_RETIREVED,
    payload: { prop, value }
  };
};

export const addToQueue = (ref) => {
  //gets values on should push to the location
  const userGender = 'male';
  const userUID = firebase.auth().currentUser.uid;
  const userEmail = firebase.auth().currentUser.email;
  //retrieves a ref to a push location
  const newRef = ref.push();
  //gets  the key to this location
  const key = newRef.key;
  //sets a value to the retrieved location
  //saved the key to be used in next scene. sets other to initial_state
  return (dispatch) => {
    newRef.set({ userEmail, userUID, userGender }) //sets the value
    .then(() => {
      dispatch({ type: ADDED_TO_QUEUE, payload: key }); //resets the state field
       Actions.inQueue({ type: 'reset' });//moved to necht scene
     }); //Reset means no backbutton
  };
};
