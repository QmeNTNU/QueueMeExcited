import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import OneSignal from 'react-native-onesignal';
import ReduxThunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import reducers from './reducers';
import Router from './Router';
import firebase from 'firebase';

//INITIAL SCREEN. CALLS TO RENDER  "START.JS"

class App extends Component {

  componentWillMount() {
    // adds listeners and calls functions for recieved/opened notification
   OneSignal.addEventListener('received', this.onReceived);
   OneSignal.addEventListener('opened', this.onOpened);
   OneSignal.addEventListener('registered', this.onRegistered);
   OneSignal.addEventListener('ids', this.onIds.bind(this));
   //

   //the input required to initializes connection with firebase database
   const config = {
     apiKey: 'AIzaSyAySL_xKeFMEzkSahvW84e4m0Y9ASk8QVg',
     authDomain: 'queuemeapp-10df5.firebaseapp.com',
     databaseURL: 'https://queuemeapp-10df5.firebaseio.com',
     projectId: 'queuemeapp-10df5',
     storageBucket: 'queuemeapp-10df5.appspot.com',
     messagingSenderId: '278836475143'
   };

   //

   //if there are noe firebase connection: inizialize with the input above
   if (!firebase.apps.length) {
     firebase.initializeApp(config);
   }
   //
  }


  componentWillUnmount() {
    //removes listeners for recieved/opened notification set in componentWillMoint
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('registered', this.onRegistered);
    OneSignal.removeEventListener('ids', this.onIds);
    //
    }

  onReceived(notification) { //function that logs that the notification is recieved
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) { //function that logs that the notification is opened and its content
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) { //function that logs that the device is registrered
    console.log('Device had been registered for push notifications!', notifData);
  }

  onIds(device) { //function that is fired when the device resivies the playerid
    console.log('Device info: ', device);
    console.log('PlayerID', device.userId);

    //saves the playerID to the users info in firebase for later use
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const playerid = device.userId;
      const userUID = firebase.auth().currentUser.uid;
      const { ref } = firebase.database().ref(`users/${userUID}/playerId`);

      ref.set({ playerid });
    }
    });
    //

    //saves the playerId in localsearch as a backup by calling "setLocalPlayerId()" below
    const playerid = device.userId;
    this.setLocalPlayerId(playerid);
    //
  }

  async setLocalPlayerId(playerid) { //saves playerid to AsyncStoradge as backup to firebase
    try {
      console.log('LOCALPLAYERID', playerid);
      await AsyncStorage.setItem('LocalPlayerId', playerid); //sets item to asyncStoradge
    } catch (error) {
      console.log('--------------ERROR ASYNC SETITEM------------------'); //only logs if it fails
    }
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); //applies reduxThunk for async actions in redux
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
