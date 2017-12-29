import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { INFO_RETIREVED, ADDED_TO_QUEUE, LOADING, SET_PLAYERID, LOAD_ADD } from './types';

export const setInfo = ({ prop, value }) => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.
  return {
    type: INFO_RETIREVED,
    payload: { prop, value }
  };
};
export const setMyLocation = (key) => { //saves users location to state
  return {
    type: ADDED_TO_QUEUE,
    payload: key
  };
};

export const fetchLocalPlayerId = (playerid) => { //saves local playerid to state
  return (dispatch) => {
          dispatch({ type: SET_PLAYERID, payload: playerid });
      };
  };

export const fetchPlayerId = () => { //retireves and saves firebase playerid to state
  const userUID = firebase.auth().currentUser.uid;
  const { ref } = firebase.database().ref(`users/${userUID}/playerId/playerid`);
  return (dispatch) => {
        ref.on('value', snapshot => {
          dispatch({ type: SET_PLAYERID, payload: snapshot.val() });
          console.log('playerid', snapshot.val());
      });
  };
};
export const addToQueue = ({ ref, myGender, playerId }) => { //adds user to queue
  //OPS! COULD USE REGULAR SET TO EASILY KNOW THE NODE-ID, BUT PUSH GIVES BETTER PERFORMANCE
  //AND PUTS/FETCHES CHILDREN IN CHRONOLOGICAL ORDER

  //gets values on should push to the location
  const id = playerId;
  const fullname = firebase.auth().currentUser.displayName;
  const userGender = myGender;
  const userUID = firebase.auth().currentUser.uid;
  const userEmail = firebase.auth().currentUser.email;
  //retrieves a ref to a push location
  const newRef = ref.push();
  //gets  the key to this location
  const key = newRef.key;

  //sets a value to the retrieved location
  //saved the key to be used in next scene. sets other to initial_state
  return (dispatch) => {
    dispatch({ type: LOAD_ADD }); //Starts loading

    newRef.set({ fullname, userEmail, userUID, userGender, id }) //sets the value
    .then(() => {
      dispatch({ type: ADDED_TO_QUEUE, payload: key }); //resets the state field
       Actions.inQueue(({ type: 'reset' }));//moved to nexht scene
     }); //Reset means no backbutton
  };
};
