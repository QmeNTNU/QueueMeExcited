import React, { Component } from 'react';
//import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';


class App extends Component {
  componentWillMount() {
/*
  const config = {
    apiKey: 'AIzaSyAySL_xKeFMEzkSahvW84e4m0Y9ASk8QVg',
    authDomain: 'queuemeapp-10df5.firebaseapp.com',
    databaseURL: 'https://queuemeapp-10df5.firebaseio.com',
    projectId: 'queuemeapp-10df5',
    storageBucket: 'queuemeapp-10df5.appspot.com',
    messagingSenderId: '278836475143'
  };

  firebase.initializeApp(config);*/
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
