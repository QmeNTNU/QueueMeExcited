import { Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';
import { QUEUE_FETCH_SUCCESS,
DELETE_QUEUE, FIRST_CHANGED,
FIRST_KEY,
FIRST_GENDER } from './types';

//brukes til å hente ut (og vise) navn i StudasList
//KAN, MEN BRUKES IKKE:  til å hente ut (og sammenligne) uid på første i INQUEUE

export const firstInLine = ({ ref }) => {
  const emptyText = 'There are no students in line';

  return (dispatch) => {
    let empty = false;
      ref.on('value', snapshot => {
    // The callback function should be called for every update in database
    console.log(snapshot.val() === null);
    //if the queue is empty ( in case studass deletes it)
    if (snapshot.val() === null) {
      dispatch({ type: FIRST_CHANGED, payload: emptyText });
      empty = true;
      return true;
    }

    snapshot.forEach(childSnapshot => {
      console.log('emptyboolean', empty);

      console.log('firstKey', childSnapshot.key);
      dispatch({ type: FIRST_CHANGED, payload: childSnapshot.val().fullname });
      dispatch({ type: FIRST_KEY, payload: childSnapshot.key });
      dispatch({ type: FIRST_GENDER, payload: childSnapshot.val().userGender });
      const playerId = childSnapshot.val().id;
      const firstBoolean = childSnapshot.val().firstBoolean;
      const data = {};

      /*if (playerId === null) {
        playerId = 'edfc360f-75b6-43db-a0c3-6dd3fd866947';
      }*/
      console.log(playerId, 'hei tjolla hopp');

      if (typeof playerId !== 'undefined') {
        if (typeof firstBoolean === 'undefined') {
      const contents = {
      'en': 'You are first in line!'
    };

      OneSignal.postNotification(contents, data, playerId);

      ref.child(childSnapshot.key).child('firstBoolean').set('true');
    }
  }
    //send notifikasjon
      // const contents = 'You are first in line';
      // OneSignal.postNotification(contents, data, playerId);
    ////
      return true;
    });
  });
  };
};

//once run it will automaticly update itself
export const fetchQueue = ({ ref }) => {
  //henter ut employees fra database
  return (dispatch) => {
        ref.on('value', snapshot => {
          dispatch({ type: QUEUE_FETCH_SUCCESS, payload: snapshot.val() });
          console.log('queue', snapshot.val());
      });
  };
};


export const deleteQueue = (deleteRef) => {
  return (dispatch) => {
    //removed value
    deleteRef.remove()
    .then(() => {
      //tells reducer to reset state to initial
      dispatch({ type: DELETE_QUEUE });
      //move to home creen
      Actions.home({ type: 'reset' });
   });
  };
};

export const nextDelete = (nextRef) => {
  return () => {
    nextRef.remove()
    .then(() => {
      console.log('SUCCESSNEXTDELETE');
      //find something to catch ect to secure state
    });
  };
};
