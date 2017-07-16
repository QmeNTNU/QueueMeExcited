import { Actions } from 'react-native-router-flux';
import { STUDENT, STUDASS } from './types';

export const Student = () => {
  return (dispatch) => {
    dispatch({ type: STUDENT });
    Actions.q();
  };
};

export const studentAssistant = () => {
  return (dispatch) => {
    dispatch({ type: STUDASS });
    Actions.info();
  };
};
