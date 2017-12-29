import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, View, Alert, Image, AsyncStorage } from 'react-native';
import { ButtonBlue, ButtonTextGreen } from './common';
import { fetchQueue, getCount, deleteQueue, nextDelete, firstInLine } from '../actions';

class StudassQueue extends Component {

componentDidMount() {
  //creates ref to retrieve info from
  const userUID = firebase.auth().currentUser.uid;
  const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}/queue`);
  //
  this.props.firstInLine({ ref });//calls action (QueueActions.js) to retrieve firs user in line
  this.props.getCount({ ref }); //calls action (CountAction.js) to retireve queue count
  this.setRecover();//calls function below to save variables to asynStoradge in case of crash
}


onQuitPress() {
  //gets ref to delete
  const userUID = firebase.auth().currentUser.uid;
  const deleteRef = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}`);
  //

  Alert.alert(   //popup dialog to make sure if user wants to quit
  'Warning',
  'You are about to delete this queue, are you sure you want to do so?',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
      { text: 'Yes', onPress: () => this.props.deleteQueue(deleteRef) },
    ]
  );
}


onNextPress() { //function that deletes first in line and moves to next
  //gets ref anf first in line
  const userUID = firebase.auth().currentUser.uid;
  const firstUID = this.props.firstKey;
  const nextRef = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}/queue/${firstUID}`);
  //

  //alert to make sure studass wants to preceed to next
  if (this.props.first !== 'There are no students in line') {
    Alert.alert(
    'Are you sure?',
    'You will now proceed to the next student in line.',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
        { text: 'Yes', onPress: () => this.props.nextDelete(nextRef) },
      ]
    );
  }
  //
}


async setRecover() { //function that saves queue info to asyncstoradge in case of chrash
  try {
    await AsyncStorage.setItem('asyncStudassSubject', this.props.studassSubject);
  } catch (error) {
    console.log('--------------ERROR ASYNC SETITEM------------------');
  }
}


renderImage() { //gets gender to display either girl or boy
  /* eslint-disable global-require */
  const icon = this.props.firstGender === 'female' ? require('./images/studassqueuewoman3.png') : require('./images/studassqueue3.png');
  return (
    <Image
      style={styles.imageStyle}
      source={icon}
    />
  );
  /* eslint-enable global-require */
}

renderEmptyImage() {
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
  if (this.props.studasscount === 0) { //no one in queue
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

        <View style={{ flex: 1, backgroundColor: '#95CAFE', borderRadius: 5, marginLeft: 40, marginRight: 40, paddingBottom: 10, marginBottom: 20 }}>

          <View style={{ height: 10, alignItems: 'center' }}>
              <Text style={{ color: '#ffffff' }} placeholder />
          </View>

        <View style={styles.infoView2}>
          <Text style={styles.textStyle2}>{this.props.first} </Text>
          <Text style={styles.textStyle}>Students in line: {this.props.studasscount} </Text>
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 40,
        marginRight: 40,
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
      color: '#ffffff',
      fontFamily: 'bebasNeue',
      fontSize: 30,

    }

  };

const mapStateToProps = state => {
  const queue = _.map(state.studassQueue, (val, uid) => {
    return { ...val, uid };
  });
  const { studasscount } = state.count;
  const { first, myLocation, studassSubject, firstKey, firstGender } = state.createQueue;
  return { queue, studasscount, first, myLocation, studassSubject, firstKey, firstGender };
};

export default connect(mapStateToProps, { fetchQueue, getCount, deleteQueue, nextDelete, firstInLine })(StudassQueue);
