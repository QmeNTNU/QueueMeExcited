import {
GET_MY_NAME
} from '../actions/types';

const INITIAL_STATE = {
    myName: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_MY_NAME:
      console.log('My name', action);
        return { ...state, myName: action.payload };

      default:
        return state;
    }
};
