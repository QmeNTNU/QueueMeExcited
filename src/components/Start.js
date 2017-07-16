import React, { Component } from 'react';
import { View, Image } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
//import HomeForm from './HomeForm';


class Home extends Component {
  state = { loggedIn: null };

    componentWillMount() {
        const config = {
          apiKey: 'AIzaSyAySL_xKeFMEzkSahvW84e4m0Y9ASk8QVg',
          authDomain: 'queuemeapp-10df5.firebaseapp.com',
          databaseURL: 'https://queuemeapp-10df5.firebaseio.com',
          projectId: 'queuemeapp-10df5',
          storageBucket: 'queuemeapp-10df5.appspot.com',
          messagingSenderId: '278836475143'
        };

        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }

    startUp() {
      switch (this.state.loggedIn) {
        case true:
          Actions.homePage();
          break;
        case false:
          Actions.auth();
          break;
        default:
          this.renderImage();
      }
    }

    renderImage() {
       /* eslint-disable global-require */
      return (
       <Image style={{ width: 300, height: 300 }} source={require('./images/beginning2.png')} />
       );
      /* eslint-enable global-require */
    }

    render() {
      return (
        <View style={{ backgroundColor: '#95CAFE', flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {this.renderImage()}
            {this.startUp()}
          </View>
        </View>
      );
    }
  }

export default Home;
