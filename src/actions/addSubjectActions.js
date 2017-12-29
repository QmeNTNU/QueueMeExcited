import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { SUBJECT_ADDED } from './types';

export const addSubject = ({ ref, emnekode, emnenavn }) => { //adds subject to favorite
  return (dispatch) => {
    ref.set({ emnekode, emnenavn }) //sets the value
    .then(() => {
      dispatch({ type: SUBJECT_ADDED }); //resets the input field
     }); //Reset means no backbutton
  };
};

export const deleteSubject = ({ ref }) => { //deletes subject from favorite
  return () => {
    ref.remove() //removes the value
    .then(() => {
    console.log('RMEMOVED SUBJECT');
     }); //Reset means no backbutton
  };
};
