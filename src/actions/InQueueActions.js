import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { DELETED_ME_FROM_QUEUE, FOUND_MY_PLACE, QUIT, SHOW_NOTIFICATION, HIDE_NOTIFICATION, SHOW_NOTIFICATION_2 } from './types';


export const deleteMeFromQueue = ({ deleteRef, ref }) => { //deletes user from queue
  return (dispatch) => {
    //to prevent WillRecieveProps to cal firstInline, and show alert!
    dispatch({ type: QUIT });
    //

    ref.off();//remove listener for queue
    deleteRef.remove()//remove user from queue
    .then(() => {
      dispatch({ type: DELETED_ME_FROM_QUEUE }); //clears the state for variables used in queue
      Actions.home({ type: 'reset' }); //routs user to homescreen
    });
  };
};

export const changeNotification = () => {
  return (dispatch) => {
    dispatch({ type: HIDE_NOTIFICATION });
  };
};

export const findMyPlaceInLine = ({ ref }) => { //finds users place in line
  //takes in the queue as an array

return (dispatch) => {
  const userUID = firebase.auth().currentUser.uid;

  let count = 0;
  let bool = false;
    ref.on('value', snapshot => {
  // The callback function should be called for every update in database
  console.log('findMyPlaceInLine', snapshot.val() === null);
  //if the queue is empty ( in case studass deletes it) it sends user to homepage
  if (snapshot.val() === null) {
    ref.off(); //turns off listener
    isDeleted(); //calls functions below to send user to homepage
    return true; // ends iterations
  }
  //

  //searches the queue to find users place
  snapshot.forEach(childSnapshot => {
    count += 1;
    console.log('minUID', userUID);
    console.log(childSnapshot.val());
    console.log(count);

  if (userUID === childSnapshot.val().userUID) { //if user is found
    dispatch({ type: FOUND_MY_PLACE, payload: count });  //saves users place to state
    //ends iterations
    count = 0;
    bool = true;
    return true;
    //
  }
  });
  //if user is not found in the queue call function below to send user home
  if (!bool) {
    isDeleted();
  }
  //
  bool = false;   //setting back to initial
});
};
};

const isDeleted = () => { //function that sends user back to homepage
  Alert.alert(
  'Stepped out of line',
  'You have been removed from this queue. Either it has been your turn, or the student assistant has ended the queue.\n\nYou will be taken to the homescreen.',
    [
      { text: 'OK', onPress: () => Actions.home(({ type: 'reset' })) },
    ]
  );
};
