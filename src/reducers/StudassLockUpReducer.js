import {
CODE_CHANGED, FETCH_CODE, CODE_APPROVED
} from '../actions/types';

const INITIAL_STATE = {
    code: '',
    retrievedCode: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CODE_CHANGED:
      console.log(action);
        return { ...state, code: action.payload };
      case FETCH_CODE:
          console.log(action);
      return { ...state, retrievedCode: action.payload };
      case CODE_APPROVED:
      return { ...state, code: '' };

      default:
        return state;
    }
};
