import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { DELETED_ME_FROM_QUEUE, FOUND_MY_PLACE, DELETE_QUEUE, DELETE_COUNT } from './types';

export const deleteMeFromQueue = (deleteRef) => {
  return (dispatch) => {
    //removed value
    deleteRef.remove()
    .then(() => {
      //SHOULD SHOW SPINNER??

      //move to another scene
      //needs to change
      Actions.queueInfo({ type: 'reset' });
      dispatch({ type: DELETED_ME_FROM_QUEUE });
      // since i am going out of the queue, i dont need to store queue in state
      //DELETE_QUEUE sets state "queue" to initial state
      dispatch({ type: DELETE_QUEUE });
   });
  };
};

export const findMyPlaceInLine = (queue, myLocation) => {
  //takes in the queue as an array
  //me as an object should be stored in memory so i can use it as a whole object
  //or get just name, uid ect

  /*return (dispatch) => {
  const userEmail1 = firebase.auth().currentUser.email;
  const userGender1 = 'male';
  const userUID1 = firebase.auth().currentUser.uid;
  //making me a object
  const Me = { userEmail: userEmail1, userUID: userUID1, userGender: userGender1 };

    const place = queue.indexOf(Me);
    dispatch({ type: FOUND_MY_PLACE, payload: place });
  };*/

return (dispatch) => {
  for (let i = 0; i < queue.length; i++) {
      if (queue[i].uid === myLocation) {
          dispatch({ type: FOUND_MY_PLACE, payload: i + 1 });
          return;
      }
  }
  console.log(queue);
  //to handle the case where the value doesn't exist
  Alert.alert(
  'Stepped out of line',
  'You have been removed from this queue. Either it has been your turn, you quit, or the student assisten has ended the queue.\n\nYou will be taken to the homescreen.',
    [
      { text: 'OK', onPress: () => Actions.queueInfo({ type: 'reset' }) },
    ]
  );
  /*  dispatch({ type: FOUND_MY_PLACE, payload: -1 });
    // since i am going out of the queue, i dont need to store queue nor count in state
    //DELETE_QUEUE sets state "queue" to initial state
    dispatch({ type: DELETE_QUEUE });
    //delete count sets state "count" to initial state
    dispatch({ type: DELETE_COUNT });*/
  };
};
