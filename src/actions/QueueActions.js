import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { QUEUE_FETCH_SUCCESS,
DELETE_QUEUE, FIRST_CHANGED } from './types';

//brukes til å hente ut (og vise) navn i StudasList
//KAN, MEN BRUKES IKKE:  til å hente ut (og sammenligne) uid på første i INQUEUE
export const firstInLine = (text) => {
  return {
    type: FIRST_CHANGED,
    payload: text
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
      //move to another scene
      Actions.homePage();//moved to necht scene
   });
  };
};

export const nextDelete = (nextRef) => {
  return () => {
    nextRef.remove()
    .then(() => {
      //find something to catch ect to secure state
    });
  };
};
