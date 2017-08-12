import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, Alert, View, Image, AsyncStorage, AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-simple-toast';
import { ButtonBlue } from './common';
import { getCount, deleteMeFromQueue, findMyPlaceInLine, changeNotification } from '../actions';
import PushController from './PushController';

class InQueue extends Component {
componentWillMount() {
  //makes ref from where we want to retrieve data
  const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
    //starts the listener for
  this.props.getCount({ ref });
  console.log('-----------');
  this.props.findMyPlaceInLine({ ref });
  console.log('Show Notification (willMount) status:');
  console.log(this.props.showNotification);
  console.log(this.props.showNotification2);
  //keep tract on nr user is in line.
  //if this numer is index 0 send notification
  this.setRecover();
  }

// componentDidMount() {
//   console.log('Show Notification (didMount) status:');
//   console.log(this.props.showNotification);
//   if (this.props.showNotification === 'show') {
//       if (AppState.currentState === 'active') {
//           Toast.show('You are first in line \nYour student assistant is waiting for you!',
//           Toast.LONG);
//     }
//     PushNotification.localNotification({
//           /* iOS and Android properties */
//           title: 'You are first in line',
//           message: 'Your student assistant is waiting for you!', // (required)
//           soundName: 'default'
//         });
//       this.props.showNotification = '';
//     }
// }

componentWillReceiveProps(nextProps) {
  console.log('Show Notification (WillRecieveProps) status:');
  console.log(nextProps.showNotification);
  console.log(nextProps.showNotification2);
  if (nextProps.showNotification === 'show') {
      if (AppState.currentState === 'active') {
          Toast.show('You are first in line \nYour student assistant is waiting for you!',
          Toast.LONG);
    }
    PushNotification.localNotification({
          /* iOS and Android properties */
          title: 'You are first in line',
          message: 'Your student assistant is waiting for you!', // (required)
          soundName: 'default',
          smallIcon: null,
        });
        this.props.changeNotification();
        console.log(this.props.showNotification);
    }
  if (nextProps.showNotification2 === 'show') {
      if (AppState.currentState === 'active') {
          Toast.show('You are second in line \nIt will soon be your turn!',
          Toast.LONG);
    }
    PushNotification.localNotification({
          /* iOS and Android properties */
          title: 'You are second in line',
          message: 'It will soon be your turn!', // (required)
          soundName: 'default',
          smallIcon: null,
        });
        this.props.changeNotification();
        console.log(this.props.showNotification2);
    }
}

//NEED A ONBACKPRESS


onQuitPress() {
//gets ref to delete
 const deleteRef = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue/${this.props.myLocation}`);
 //gets ref to unlisten to before deleting so popup wont show
 const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);

//popup dialog to make sure if user wants to quit
  Alert.alert(
  'Warning',
  'You are about to step out of this queue, are you sure you want to do so?',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
      { text: 'Yes', onPress: () => this.props.deleteMeFromQueue({ deleteRef, ref }) },
    ]
  );
}


async setRecover() {
  try {
    await AsyncStorage.setItem('asyncStudentSubject', this.props.subject);
    await AsyncStorage.setItem('asyncStudentstudassLocation', this.props.studassLocation);
    await AsyncStorage.setItem('asyncStudentmyLocation', this.props.myLocation);
  } catch (error) {
    console.log('--------------ERROR ASYNC SETITEM------------------');
  }
}


getGender() {
  //GETGENDER FROM STATE/ ASYNC STORAGE. SHOULD RETRIVE THIS IN COMPONENTWILLMOUNT
  return 'male';
}

sendNotification() {
  //make sure this is recived even if app is not running in background.
}

renderImage() {
  //gets gender to display either girl or boy
  //const gender = this.getGender();
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  const icon = this.props.myGender === 'female' ? require('./images/inqueuewoman3.png') : require('./images/inqueue3.png');
  return (
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={icon}
    />
  );
/* eslint-enable global-require */
}

renderArrowDownImage() {
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  return (
    <Image
    style={styles.imageStyle}
    source={require('./images/arrowdownblue.png')}
    />
  );
/* eslint-enable global-require */
}

  render() {
    return (
      <View style={styles.wholeScreen}>


        <View style={styles.imageView}>
          {this.renderImage()}
        </View>

        <View style={{ flex: 1, backgroundColor: '#213140', borderRadius: 5, marginLeft: 40, marginRight: 40, marginTop: -50, paddingBottom: 10 }}>

          <View style={{ height: 10, alignItems: 'center' }}>
            {this.renderArrowDownImage()}
          </View>

          <View style={styles.ContainerView}>
            <View style={styles.infoView}>
              <Text style={styles.textStyle}>You are nr: </Text>
            </View>
              <View style={styles.infoView3}>
                <Text style={styles.textStyle2}> {this.props.place}/{this.props.studasscount}</Text>
              </View>
          </View>

          </View>

          <View style={styles.buttonView}>
            <ButtonBlue onPress={this.onQuitPress.bind(this)}>
              QUIT
            </ButtonBlue>

        </View>
        <PushController />
      </View>
      );
    }
  }

  const styles = {
    wholeScreen: {
      flex: 1,
      flexDirection: 'column',
    },
    imageView: {
      flex: 5,

    },
    imageStyle: {
      flex: 1,
      resizeMode: 'contain'
    },
    ContainerView: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#ffffff'
    },
    infoView2: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    infoView3: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },

    buttonView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
    },
    textStyle: {
      color: '#ffffff',
      fontSize: 25,
      fontFamily: 'bebasNeue'
    },
    textStyle2: {
      color: '#ffffff',
      fontSize: 40,
      fontFamily: 'bebasNeue'
    },
    textStyle3: {
      fontSize: 50
    },
    textStyle4: {
      fontSize: 20
    }

  };


const mapStateToProps = (state) => {
  //henter ut studascount fra reduceren count
  const { studasscount } = state.count;
  const { myGender } = state.nameRed;
  const { myLocation, studassLocation, subject } = state.queueInfo;
  const { place, firstboolean, quit, showNotification, showNotification2 } = state.inQueue;
  return { studasscount, myLocation, place, firstboolean, studassLocation, subject, quit, myGender, showNotification, showNotification2 };
};
 //kan skrive queue[0].name

export default connect(mapStateToProps, { getCount, deleteMeFromQueue, findMyPlaceInLine, changeNotification })(InQueue);
