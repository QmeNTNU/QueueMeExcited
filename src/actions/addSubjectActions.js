import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { SUBJECT_ADDED } from './types';
//have to add it to types as well
//have to add it to index.js
//have to make reducer to handele AVAILABLE_CHANGED
// have add it to reducers/index.js

export const addSubject = ({ ref, emnekode, emnenavn }) => {

console.log(ref, emnekode, emnenavn);
  return (dispatch) => {
    ref.set({ emnekode, emnenavn }) //sets the value
    .then(() => {
      dispatch({ type: SUBJECT_ADDED }); //resets the input field
     }); //Reset means no backbutton
  };
};
export const deleteSubject = ({ ref }) => {
  return () => {
    ref.remove() //removes the value
    .then(() => {
    console.log('RMEMOVED SUBJECT');
     }); //Reset means no backbutton
  };
};

/*
export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text
  };
};*/
