import {
  SIGNUP_EMAIL_CHANGED,
  SIGNUP_PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  FULLNAME_CHANGED,
  CREATE_USER_SUCCESS,
  GENDER_CHANGED,
  CREATE_USER_FAIL,
  PASSWORD_WRONG,
  SELECT_GENDER,
  FULLNAME_WRONG,
  EMAIL_WRONG,
  EMPTY_PASSWORD,
  CREATE_USER,
  SHORT_PASSWORD,
  LOGIN
} from '../actions/types';

const INITIAL_STATE = {
  signupEmail: '',
  signupPassword: '',
  confirmPassword: '',
  fullname: '',
  gender: '',
  user: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    //her settes email (osv..) til det som skrives inn av brukeren
    case FULLNAME_CHANGED:
      return { ...state, fullname: action.payload };
    case SIGNUP_EMAIL_CHANGED:
      return { ...state, signupEmail: action.payload };
    case SIGNUP_PASSWORD_CHANGED:
      return { ...state, signupPassword: action.payload };
    case CONFIRM_PASSWORD_CHANGED:
      return { ...state, confirmPassword: action.payload };
    case GENDER_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CREATE_USER:
      return { ...state, loading: true, };
    case CREATE_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN:
      return { ...state, ...INITIAL_STATE };
    case FULLNAME_WRONG:
      return { ...state,
        fullname: '',
        loading: false };
    case EMPTY_PASSWORD:
          return { ...state,
          loading: false };
    case PASSWORD_WRONG:
      return { ...state,
          signupPassword: '',
          confirmPassword: '',
          loading: false };
    case SHORT_PASSWORD:
      return { ...state,
          signupPassword: '',
          confirmPassword: '',
          loading: false };
    case SELECT_GENDER:
      return { ...state,
          gender: '',
          loading: false };
    case EMAIL_WRONG:
      return { ...state,
          signupEmail: '',
          loading: false };
    case CREATE_USER_FAIL:
      return { ...state,
          signupEmail: '',
          loading: false };
    default:
      return state;
  }
  };
