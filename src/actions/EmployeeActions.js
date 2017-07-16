import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS
}
from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  // henter ut brukeren som er innlogget
    const { currentUser } = firebase.auth();
//refereanse til databasen vår, hvor alle brukere har en userId med en liste employees
    return (dispatch) => {
    firebase.database().ref(`/Person/${currentUser.uid}`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employeeList({ type: 'reset' });
      //type: reset gjør at vi går tilbake til EmployeeList, men ikke som en ny EmployeeList
      //med tilbakeknapp. Fjerner tilbakeknapp i venstre hjørnet.
    });
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  //henter ut employees fra database
  return (dispatch) => {
      firebase.database().ref(`/Person/${currentUser.uid}`)
        .on('value', snapshot => {
          dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
