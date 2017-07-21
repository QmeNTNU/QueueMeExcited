import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { AVAILABLE_CHANGED, ROOM_CHANGED, QUEUE_CREATED, QUEUE_CREATED_FAILED, LOADING, MY_LOCATION, STUD_SUBJECT } from './types';
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
export const studSubject = (text) => {
  return {
    type: STUD_SUBJECT,
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

    ref.set({ userEmail, available, room, userUID, userGender }) //sets the value
    .then(() => {
      dispatch({ type: QUEUE_CREATED }); //resets the input field
       Actions.queue();//moved to necht scene
     });
  };
};
/*could have.. for preformans:
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
