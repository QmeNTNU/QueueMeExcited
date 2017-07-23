import { AVAILABLE_CHANGED, ROOM_CHANGED, QUEUE_CREATED, QUEUE_CREATED_FAILED, FIRST_CHANGED, LOADING, MY_LOCATION, STUD_SUBJECT, DELETE_QUEUE } from '../actions/types';

const INITIAL_STATE = { available: '', room: '', error: '', loading: false, first: 'There are no students in line', myLocation: '', studassSubject: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AVAILABLE_CHANGED:
      //oppdaterer hele tiden availible input
      return { ...state, available: action.payload };
    case ROOM_CHANGED:
        //oppdaterer hele tiden room input
        return { ...state, room: action.payload };
    case QUEUE_CREATED_FAILED:
    //sets error message and clear the field with the error (available)
      return { ...state, error: '*Unvalid input\nMake sure you write the hourmark as 00,00. ', available: '' };
    case LOADING:
      //tells scene to render spinner AND remove error message while doing so
      return { ...state, loading: true, error: '' };
    case QUEUE_CREATED:
    //STUPID TO HAVE STUDSUBJECT AND MYLOCATION HERE
        return { ...state, available: '', room: '', error: '', loading: false, first: 'There are no students in line' };
    case FIRST_CHANGED:
    console.log(action);
        //keeps track of the first person in line to display to scrrem
        return { ...state, first: action.payload };
    case MY_LOCATION:
      return { ...state, myLocation: action.payload };
    case STUD_SUBJECT:
    console.log('subject': action);
      return { ...state, studassSubject: action.payload };
      case DELETE_QUEUE:
        return INITIAL_STATE;
    default:
      return state;
  }
};


//have to export it to index.js
