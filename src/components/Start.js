import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import firebase from 'firebase';
import OneSignal from 'react-native-onesignal';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  state = { loggedIn: null };

    componentWillMount() {
        //input to initialize connection to firebase
        const config = {
          apiKey: 'AIzaSyAySL_xKeFMEzkSahvW84e4m0Y9ASk8QVg',
          authDomain: 'queuemeapp-10df5.firebaseapp.com',
          databaseURL: 'https://queuemeapp-10df5.firebaseio.com',
          projectId: 'queuemeapp-10df5',
          storageBucket: 'queuemeapp-10df5.appspot.com',
          messagingSenderId: '278836475143'
        };
        //

        //if there are noe connection to firebase, call to initialize with input above
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }
        //

        //depending on if the user is already logged in or needs to log in the function changes the state.loggedIn accordingly
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //waits 2 seconds "kunstpause"
          //NEED TO STOP????????
          setTimeout(() => { this.setState({ loggedIn: true }); }, 2000);
        } else {
          //waits 2 seconds "kunstpause"
          setTimeout(() => { this.setState({ loggedIn: false }); }, 2000);
        }
        });
        //
    }

    componentDidMount() {
        //initializing Onesignal to be able to send messages
        OneSignal.configure({
        });
        //
    }

    startUp() { //function called in render. Sends user to homepage or login
      switch (this.state.loggedIn) {
        case true:
          //sends user to home screen
          Actions.homePage({ type: 'reset' });
          break;
        case false:
          //sends user to login
          Actions.auth({ type: 'reset' });
          break;
        default:
          this.renderImage({ type: 'reset' });
      }
    }

    renderImage() {
       /* eslint-disable global-require */
      return (
       <Image style={{ flex: 1, resizeMode: 'contain' }} source={require('./images/LOGO2.png')} />
       );
      /* eslint-enable global-require */
    }

    render() {
      return (
        <View style={{ backgroundColor: '#95CAFE', flex: 1 }}>

          <View style={{ flex: 1 }}>
            <Text style={{ color: '#95CAFE' }} placeholder />
          </View>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            {this.renderImage()}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ color: '#95CAFE' }} placeholder />
          </View>
            {this.startUp()}

        </View>
      );
    }
  }

export default Home;
