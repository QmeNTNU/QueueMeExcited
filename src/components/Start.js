import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
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
          //waits 2 seconds "kunstpause"
          //NEED TO STOP????????
          setTimeout(() => { this.setState({ loggedIn: true }); }, 2000);
        } else {
          //waits 2 seconds "kunstpause"
          setTimeout(() => { this.setState({ loggedIn: false }); }, 2000);
        }
      });
    }

    startUp() {
      switch (this.state.loggedIn) {
        case true:
          Actions.homePage();
          break;
        case false:
        //sends user to turtorial
        //if (this.props.firstTimeOnApp){
        //actions.modal
        //}
          Actions.auth();
          break;
        default:
          this.renderImage();
      }
    }

    renderImage() {
       /* eslint-disable global-require */
      return (
       <Image style={{ flex: 1, resizeMode: 'contain' }} source={require('./images/LOGO.png')} />
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
