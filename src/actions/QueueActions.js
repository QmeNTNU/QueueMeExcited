import { Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';
import { QUEUE_FETCH_SUCCESS,
DELETE_QUEUE, FIRST_CHANGED,
FIRST_KEY,
FIRST_GENDER } from './types';

export const firstInLine = ({ ref }) => { //retirievs info about the first person in line
  const emptyText = 'There are no students in line'; //placeholder text if queue is empty
  return (dispatch) => {
    let empty = false; //initial boolean

    ref.on('value', snapshot => { //retireves the queue
    console.log(snapshot.val() === null);

    //if the queue is empty (in case studass deletes it) we stop the iteration
    if (snapshot.val() === null) {
      dispatch({ type: FIRST_CHANGED, payload: emptyText });
      empty = true;
      return true;
    }
    //
    //iterates trough only the FIRST child, retireves info and sends notification
    snapshot.forEach(childSnapshot => {
      console.log('emptyboolean', empty);
      console.log('firstKey', childSnapshot.key);

      //retireves information
      dispatch({ type: FIRST_CHANGED, payload: childSnapshot.val().fullname });
      dispatch({ type: FIRST_KEY, payload: childSnapshot.key });
      dispatch({ type: FIRST_GENDER, payload: childSnapshot.val().userGender });
      const playerId = childSnapshot.val().id;
      const firstBoolean = childSnapshot.val().firstBoolean;
      const data = {};
      //

      //sending notification
      if (typeof playerId !== 'undefined') {
        if (typeof firstBoolean === 'undefined') { //to prevent for double sending
          const contents = {
          'en': 'You are first in line!'
          };

          OneSignal.postNotification(contents, data, playerId);

          ref.child(childSnapshot.key).child('firstBoolean').set('true');//to prevent double sending
        }
      }
      //
      return true; //stop iteration
    });
    //
  });
  };
};


export const fetchQueue = ({ ref }) => { //retireves and saves the queue
  return (dispatch) => {
        ref.on('value', snapshot => {
          dispatch({ type: QUEUE_FETCH_SUCCESS, payload: snapshot.val() });
          console.log('queue', snapshot.val());
      });
  };
};


export const deleteQueue = (deleteRef) => { //deletes queue when studass quits
  return (dispatch) => {
    deleteRef.remove() //removes the queue
    .then(() => {
      dispatch({ type: DELETE_QUEUE }); //tells reducer to reset state to initial
      Actions.home({ type: 'reset' }); //routes to homepage
   });
  };
};

export const nextDelete = (nextRef) => { //deletes first person in line
  return () => {
    nextRef.remove() //removes first person in line
    .then(() => {
      console.log('SUCCESSNEXTDELETE');
      //find something to catch ect to secure state
    });
  };
};
