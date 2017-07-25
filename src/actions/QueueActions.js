import { Actions } from 'react-native-router-flux';
import { QUEUE_FETCH_SUCCESS,
DELETE_QUEUE, FIRST_CHANGED,
FIRST_KEY } from './types';

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
