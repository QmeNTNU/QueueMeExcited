import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { SEARCH_CHANGED } from './types';
//have to add it to types as well
//have to add it to index.js
//have to make reducer to handele AVAILABLE_CHANGED
// have add it to reducers/index.js
export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text
  };
};
