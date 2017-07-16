import {
   EMAIL_CHANGED,
   PASSWORD_CHANGED,
   LOGIN_USER_SUCCESS,
   LOGIN_USER_FAIL,
   LOGIN_USER,
   SIGNUP,
   FORGOT_PASSWORD
  } from '../actions/types';
//lager en inital_state for første gang koden blir kjørt
const INITIAL_STATE = {
   email: '',
   password: '',
   user: null,
   loading: false
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
      //...state = gammel state,
      // action.payload = ny state
      //ett nytt objekt lages som ikke er likt det gamle

      // state.email = action.payload;
      //return state;
      // IKKE LOV!!! ==> redux tror ingenting har skjedd
    case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGNUP:
        return { ...state, ...INITIAL_STATE };
    case FORGOT_PASSWORD:
        return { ...state, ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
        return { ...state,
          password: '',
          email: '',
          loading: false };
    case LOGIN_USER:
        return { ...state, loading: true };
    default:
     return state;
  }
};

//ansvarlig for alt av auth
