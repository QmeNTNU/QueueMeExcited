import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { AVAILABLE_CHANGED, ROOM_CHANGED, QUEUE_CREATED, QUEUE_CREATED_FAILED, LOADING } from './types';
//have to add it to types as well
//have to add it to index.js
//have to make reducer to handele AVAILABLE_CHANGED
// have add it to reducers/index.js
export const availableChanged = (text) => {
  return {
    type: AVAILABLE_CHANGED,
    payload: text
  };
};
export const roomChanged = (text) => {
  return {
    type: ROOM_CHANGED,
    payload: text
  };
};


export const makeQueue = ({ available, room, ref }) => {
  //MUST HAVE VALIDATION////////////////////////////////////
  if (!validateInput(available)) {
    return (dispatch) => {
    dispatch({ type: QUEUE_CREATED_FAILED });
    };
  }

  //gets rest of values on should push to the location
  const userGender = 'male';
  const userUID = firebase.auth().currentUser.uid;
  const userEmail = firebase.auth().currentUser.email;

  return (dispatch) => {
    dispatch({ type: LOADING });//sets spinner

    ref.push({ userEmail, available, room, userUID, userGender }) //sets the value
    .then(() => {
      dispatch({ type: QUEUE_CREATED }); //resets the input field
       Actions.queue();//moved to necht scene
     }); //Reset means no backbutton
  };
};

const validateInput = (text) => {
//gets input from the avaiable prop, and checks if it is on correct format
if (text.length < 5) {
  return false;
}
if (text.charAt(2) !== '.') {
  return false;
}
return true;
};


/*
//have to add arr: [] in initial state for it to work
export const childAdded = () => {
  const { currentUser } = firebase.auth();
  const commentsRef = firebase.database().ref(`/Person/${currentUser.uid}`);
  return (dispatch) => {
    commentsRef.on('value', snapshot => {
      dispatch({ type: CHILD_ADDED, payload: snapshot.val() });
    });
  };
};

*/

/*export const fetchQueue = () => {
  const itemsRef = firebase.database().ref('/Person');

  return (dispatch) => {
    itemsRef.on('value', (snap) => {
      snap.forEach((child) => {
        const item = { name: child.val().name, uid: child.key };
        dispatch({ type: QUEUE_FETCH_SUCCESS, payload: item });
      });
    });
  };
};*/
