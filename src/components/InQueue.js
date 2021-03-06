import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';
import { Text, Alert, View, Image, AsyncStorage, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { ButtonBlue } from './common';
import { getCount, deleteMeFromQueue, findMyPlaceInLine, changeNotification } from '../actions';
import PushController from './PushController';

class InQueue extends Component {
state = { modalOpen: false,
          height: '',
          width: '',
          scale: new Animated.Value(1)
        };

componentWillMount() {
  //retireves dimension of screen to make sure views fits
  const { height, width } = Dimensions.get('window');
  this.setState({ height, width });
  //
    //calls action (CountAction.js) to retireve count in line
  const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
  this.props.getCount({ ref });
  //
  //sends notification to studass since the queue has been empty
  const { CountBeforeEntering, studassPlayerId } = this.props;
  const data = {};
  if (CountBeforeEntering === 0) {
    if (typeof studassPlayerId !== 'undefined') {
        const contents = {
        'en': 'You have a student in line!'
        };
        OneSignal.postNotification(contents, data, studassPlayerId); //sends the actual notification
    }
  }
  //

  this.props.findMyPlaceInLine({ ref }); //calls action (inQueueAction.js) to find users place in line
  this.setRecover(); //calls function below to save variables to asynStoradge in case of crash
  }

  componentDidMount() {
  this.AnimatedPulse(); //starts animation function below
  }

onPressInfo() {
  this.setState({ modalOpen: !this.state.modalOpen });
  Actions.InqueueModal();
}

onQuitPress() {
//gets ref to users location (to know where to delete)
 const deleteRef = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue/${this.props.myLocation}`);
 //gets ref to the queue (to know where to unlisten to before deleting so popup wont show)
 const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);

  Alert.alert(//popup dialog to make sure if user wants to quit
  'Warning',
  'You are about to step out of this queue, are you sure you want to do so?',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
      { text: 'Yes', onPress: () => this.props.deleteMeFromQueue({ deleteRef, ref }) },
    ]
  );
}


async setRecover() { //function that saves queue info to asyncstoradge in case of chrash
  try {
    await AsyncStorage.setItem('asyncStudentSubject', this.props.subject);
    await AsyncStorage.setItem('asyncStudentstudassLocation', this.props.studassLocation);
    await AsyncStorage.setItem('asyncStudentmyLocation', this.props.myLocation);
  } catch (error) {
    console.log('--------------ERROR ASYNC SETITEM------------------');
  }
}

renderInfoImage() { //displays info image
  /* eslint-disable global-require */
  return (
    <TouchableOpacity onPress={this.onPressInfo.bind(this)} style={{ marginLeft: 60 }}>
      <Image
      style={{ height: 35, width: 35 }}
      source={require('./images/infobutton.png')}
      />
    </TouchableOpacity>
  );
  /* eslint-enable global-require */
}

renderImage() { //gets gender to display either girl or boy image
  /* eslint-disable global-require */
  const icon = this.props.myGender === 'female' ? require('./images/inqueuewoman4.png') : require('./images/inqueue4.png');
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
  /* eslint-disable global-require */
  return (
    <Image
    style={styles.imageStyle}
    source={require('./images/arrowdownblue.png')}
    />
  );
  /* eslint-enable global-require */
}

renderOverlayImage() {
  /* eslint-disable global-require */
  const icon = this.props.place === 1 ? require('./images/bobbleTurn.png') : require('./images/bobble.png');

  return (
    <Animated.Image
    style={[styles.imageStyle, { position: 'absolute', height: 100, width: 100, left: (this.state.width/2) + 60},{
           transform: [
             { scaleY: this.state.scale },
             { scaleX: this.state.scale },

           ]
         }]}
         source={icon}
    />
  );
  /* eslint-enable global-require */
}

AnimatedPulse() {
Animated.loop(
  Animated.sequence([
    Animated.timing(this.state.scale, {
      toValue: 0.90,
      duration: 1500,
    }),
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 1500
    })
  ])

).start();
}

  render() {
    return (
      <View style={styles.wholeScreen}>
        <View>
        {this.renderInfoImage()}
        </View>

        <View style={styles.imageView}>
          {this.renderImage()}
          {this.renderOverlayImage()}
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
  const { studasscount } = state.count;
  const { myGender } = state.nameRed;
  const { myLocation, studassLocation, subject, studassPlayerId, CountBeforeEntering } = state.queueInfo;
  const { place, firstboolean, quit, showNotification, showNotification2 } = state.inQueue;
  return { studasscount, myLocation, place, firstboolean, studassLocation, subject, quit, myGender, showNotification, showNotification2, studassPlayerId, CountBeforeEntering };
};

export default connect(mapStateToProps, { getCount, deleteMeFromQueue, findMyPlaceInLine, changeNotification })(InQueue);
