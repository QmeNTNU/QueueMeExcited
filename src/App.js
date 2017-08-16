import React, { Component } from 'react';
//import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import OneSignal from 'react-native-onesignal';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import firebase from 'firebase';


class App extends Component {

  componentWillMount() {
  OneSignal.addEventListener('received', this.onReceived);
   OneSignal.addEventListener('opened', this.onOpened);
   OneSignal.addEventListener('registered', this.onRegistered);
   OneSignal.addEventListener('ids', this.onIds);
   const config = {
     apiKey: 'AIzaSyAySL_xKeFMEzkSahvW84e4m0Y9ASk8QVg',
     authDomain: 'queuemeapp-10df5.firebaseapp.com',
     databaseURL: 'https://queuemeapp-10df5.firebaseio.com',
     projectId: 'queuemeapp-10df5',
     storageBucket: 'queuemeapp-10df5.appspot.com',
     messagingSenderId: '278836475143'
   };

   if (!firebase.apps.length) {
     firebase.initializeApp(config);
   }
  }

  componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log('Notification received: ', notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
        console.log('Device had been registered for push notifications!', notifData);
    }

    onIds(device) {
      console.log('Device info: ', device);
      console.log('PlayerID', device.userId);
      firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const playerid = device.userId;
        const userUID = firebase.auth().currentUser.uid;
        const { ref } = firebase.database().ref(`users/${userUID}/playerId`);

        ref.set({ playerid });
      } else {

      }
    });

  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
