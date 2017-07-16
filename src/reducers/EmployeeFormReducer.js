import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shitft: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
      //[] symboliserer IKKE array
    case EMPLOYEE_CREATE:
      return INITIAL_STATE;
      //resets EmployeeCreate-klassen slik at den er tom når vi går inn i den igjen
    default:
      return state;
  }
};
