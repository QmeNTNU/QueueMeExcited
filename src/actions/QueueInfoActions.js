import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import OneSignal from 'react-native-onesignal';
import { INFO_RETIREVED, ADDED_TO_QUEUE, LOADING, SET_PLAYERID } from './types';

export const setInfo = ({ prop, value }) => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.
  return {
    type: INFO_RETIREVED,
    payload: { prop, value }
  };
};
export const setMyLocation = (key) => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.
  return {
    type: ADDED_TO_QUEUE,
    payload: key
  };
};
export const fetchPlayerId = () => {
  const userUID = firebase.auth().currentUser.uid;
  const { ref } = firebase.database().ref(`users/${userUID}/playerId/playerid`);
  return (dispatch) => {
        ref.on('value', snapshot => {
          dispatch({ type: SET_PLAYERID, payload: snapshot.val() });
          console.log('playerid', snapshot.val());
      });
  };
};
export const addToQueue = ({ ref, myGender, playerId }) => {
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

  // OneSignal.registerForPushNotifications();
  // OneSignal.push(() => {
  //     OneSignal.on('notificationPermissionChange', (permissionChange) => {
  //         const currentPermission = permissionChange.to;
  //
  //         if (currentPermission === 'granted') {
  //             OneSignal.getUserId((userId) => {
  //                 console.log(userId);
  //             });
  //         }
  //     });
  // });

  // const status = OneSignal.getPermissionSubscriptionState();
  // status.getPermissionStatus().getEnabled();
  // console.log(status.getSubscriptionStatus().getUserId());


  // OneSignal.onIds((ids) => {
  //             console.log('getIds: ', ids);
  //             const deviceToken = ids.pushToken;
  //             const userId = ids.userId;
  //             console.log(userId);
  //             console.log(deviceToken);
  //   });

  //sets a value to the retrieved location
  //saved the key to be used in next scene. sets other to initial_state
  return (dispatch) => {
    dispatch({ type: LOADING }); //Starts loading

    newRef.set({ fullname, userEmail, userUID, userGender, id }) //sets the value
    .then(() => {
      dispatch({ type: ADDED_TO_QUEUE, payload: key }); //resets the state field
       Actions.inQueue(({ type: 'reset' }));//moved to nexht scene
     }); //Reset means no backbutton
  };
};
