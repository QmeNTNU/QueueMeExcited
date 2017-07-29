import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, View, Alert, Image, AsyncStorage } from 'react-native';
import { ButtonBlue, ButtonTextGreen } from './common';
import { fetchQueue, getCount, deleteQueue, nextDelete, firstInLine } from '../actions';

class StudassQueue extends Component {

  //want to watch for a queue the instant the scene is loaded
  componentWillMount() {
  //connect(props) do not get fetched properly before componenDIDmount. moved it there instead
  }

componentDidMount() {
  const userUID = firebase.auth().currentUser.uid;
  const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}/queue`);
  //starts the listener for
  this.props.firstInLine({ ref });
  this.props.getCount({ ref });
  this.setRecover();

  //on timeout the queue will be deleted
  //KAN VURDERE OG SETTE EN STATE "TOUCHED" TIL Å SE HVOR LENGE SIDEN DET ER STUDASS VAR AKTIV
/*  const deleteRef = firebase.database().ref('/Person');
  setTimeout(() => {
    //popup dialog to tell user timeout deleted the queue
      Alert.alert(
      'Timeout',
      'Your queue had reached its maximum of 6 hours. To protect against inactive queues you are taken to the home screen',
        [
          { text: 'OK', onPress: () => this.props.deleteQueue(deleteRef) },
        ]
      );
   }, 10000);*/
}

//when quiting queue
onQuitPress() {
  const userUID = firebase.auth().currentUser.uid;
//gets ref to delete (whole node)
const deleteRef = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}`);
//popup dialog to make sure if user wants to quit
  Alert.alert(
  'Warning',
  'You are about to delete this queue, are you sure you want to do so?',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
      { text: 'Yes', onPress: () => this.props.deleteQueue(deleteRef) },
    ]
  );
}

//when goint to next in line
onNextPress() {
  const userUID = firebase.auth().currentUser.uid;
  const firstUID = this.props.firstKey;
  console.log('firstKey', firstUID);
  const nextRef = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}/queue/${firstUID}`);
  this.props.nextDelete(nextRef);
}


async setRecover() {
  try {
    await AsyncStorage.setItem('asyncStudassSubject', this.props.studassSubject);
  } catch (error) {
    console.log('--------------ERROR ASYNC SETITEM------------------');
  }
}


renderImage() {
  //gets gender to display either girl or boy
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  const icon = this.props.firstGender === 'female' ? require('./images/studassqueuewoman.png') : require('./images/studassqueue.png');
  return (
    <Image
      style={styles.imageStyle}
      source={icon}
    />
  );
/* eslint-enable global-require */
}

renderEmptyImage() {
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  return (
    <Image
    style={styles.imageStyle}
    source={require('./images/emptyLine2.png')}
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

//depeding if the queue is empty, and depending on the first persons gender,
//we want to render the screen differently
renderScreen() {
    /* eslint-disable global-require */
  if (this.props.studasscount === 0) {
    return (
      <View style={styles.wholeScreen}>

        <View style={styles.nextView}>
          <Text style={styles.textStyle}>Next in line:</Text>
        </View>

        <View style={styles.imageView}>
          {this.renderEmptyImage()}
        </View>

        <View style={{ flex: 1, backgroundColor: '#95CAFE', borderRadius: 5, marginLeft: 40, marginRight: 40, paddingBottom: 10, marginBottom: 20 }}>

          <View style={{ height: 10, alignItems: 'center' }}>
              <Text style={{ color: '#ffffff' }} placeholder />
          </View>

        <View style={styles.infoView2}>
          <Text style={styles.textStyle}>{this.props.first}</Text>
        </View>

      </View>

        <View style={styles.buttonView}>
          <ButtonBlue onPress={this.onQuitPress.bind(this)}>
            QUIT
          </ButtonBlue>
          <ButtonTextGreen onPress={this.onNextPress.bind(this)}>
            NEXT
          </ButtonTextGreen>
        </View>


      </View>
      );
  }
    /* eslint-enable global-require */
    return (
      <View style={styles.wholeScreen}>

        <View style={styles.nextView}>
          <Text style={styles.textStyle}>Next in line:</Text>
        </View>

        <View style={styles.imageView}>
          {this.renderImage()}
        </View>

        <View style={{ flex: 1, backgroundColor: '#213140', borderRadius: 5, marginLeft: 40, marginRight: 40, paddingBottom: 10, marginBottom: 20 }}>

          <View style={{ height: 10, alignItems: 'center' }}>
              <Text style={{ color: '#ffffff' }} placeholder />
          </View>

        <View style={styles.infoView}>
          <Text style={styles.textStyle}>{this.props.first}</Text>
        </View>
        <View style={styles.infoView2}>
          <Text style={styles.textStyle}>Students in line: {this.props.studasscount}</Text>
        </View>

      </View>

        <View style={styles.buttonView}>
          <ButtonBlue onPress={this.onQuitPress.bind(this)}>
            QUIT
          </ButtonBlue>
          <ButtonTextGreen onPress={this.onNextPress.bind(this)}>
            NEXT
          </ButtonTextGreen>
        </View>


      </View>
      );
}

  render() {
      console.log(this.props);
    return (
      this.renderScreen()
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      flex: 1,
      resizeMode: 'contain'
    },
    ContainerView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 40,
      marginRight: 40,
      borderBottomWidth: 1,
      borderColor: '#ffffff'
    },
    infoView2: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 40,
      marginRight: 40,

      borderColor: '#ffffff'
    },
    nextView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30
    },
    buttonView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      color: '#ffffff',
      fontSize: 25,
      fontFamily: 'bebasNeue'
    },
    textStyle2: {
      color: '#F58C6C',
      fontFamily: 'bebasNeue',
      fontSize: 25,

    }

  };

const mapStateToProps = state => {
  //henter ut listen fra reduceren studassqueue
  const queue = _.map(state.studassQueue, (val, uid) => {
    return { ...val, uid };
  });
//henter ut studascount fra reduceren count
  const { studasscount } = state.count;
  const { first, myLocation, studassSubject, firstKey, firstGender } = state.createQueue;
  return { queue, studasscount, first, myLocation, studassSubject, firstKey, firstGender };
};
 //kan skrive queue[0].name

export default connect(mapStateToProps, { fetchQueue, getCount, deleteQueue, nextDelete, firstInLine })(StudassQueue);
