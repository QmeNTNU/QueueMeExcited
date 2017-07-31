import {
GET_MY_NAME,
GET_MY_GENDER,
FIRST_TIME
} from '../actions/types';

const INITIAL_STATE = {
    myName: '',
    myGender: '',
    firstTime: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_MY_NAME:
      console.log('My name', action);
        return { ...state, myName: action.payload };
      case GET_MY_GENDER:
        console.log('My Gender', action);
          return { ...state, myGender: action.payload };
      case FIRST_TIME:
        return { ...state, firstTime: action.payload };
      default:
        return state;
    }
};
