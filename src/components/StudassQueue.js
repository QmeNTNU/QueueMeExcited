import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, View, Alert, Image } from 'react-native';
import { Button, ButtonTextGreen } from './common';
import { fetchQueue, getCount, deleteQueue, nextDelete, firstInLine } from '../actions';

class StudassQueue extends Component {

  //want to watch for a queue the instant the scene is loaded
  componentWillMount() {
    const ref = firebase.database().ref('Subject');
    //starts the listener for
    this.props.fetchQueue({ ref });
    this.props.getCount({ ref });
  }

componentDidMount() {
  //AFTER COMPONENTWILMOUNT HAVE FETCHED THE LIST I WANT TO RETRIVE firstInLine
  //componentWillReceiveProps dosent get called with initial props, so i have to do it here
  if (this.props.queue.length) {
    const text = this.props.queue[0].uid;
    this.props.firstInLine(text);
  }

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
componentWillReceiveProps(nextProps) {
  //keeps track of the first person in line to display to scrrem

  //porblem with getting firstInLine called on the initial fetch if there where
  //peaple in line from before
  //solved it by saying that it should be called if the inital queue is null
  //and the incoming queue is not.THIS STOPS THE APP FROM LOOP-RENDER
if (!this.props.queue.length && nextProps.queue.length) {
  const text = nextProps.queue[0].uid;
  this.props.firstInLine(text);
  return;
}

//if we press next and there is noone lefts
//->nextProp will be empty and we can not call on queueu[0]
if (!nextProps.queue.length) {
  // STOPS IT FROM A RENDER-LOOP
  if (this.props.first === 'There are no students in line') {
    console.log('RETURN FIRST UNCHANGED');
    return;
  }
  const text = 'There are no students in line';
  this.props.firstInLine(text);
  return;
}
//only updates if latest prop is different
if (this.props.queue[0].uid !== nextProps.queue[0].uid) {
  const text = nextProps.queue[0].uid;
  this.props.firstInLine(text);
  return;
}
}
//when quiting queue
onQuitPress() {
//gets ref to delete (whole node)
  const deleteRef = firebase.database().ref('/Person');
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
  //should delete index 0 from databse.
  //list would automaticly render
//prevents app to call undefined queue[0] since empty
  if (!this.props.queue.length) {
      return;//NOT NEEDED F BUTTON IS HIDDEN!
  }
  const firstUID = this.props.queue[0].uid;
  const { currentUser } = firebase.auth(); //SHOULD COME FROM STATE/SHARED PREFERANCES
  const nextRef = firebase.database().ref(`/Person/${currentUser.uid}`)
                      .child(firstUID);
  this.props.nextDelete(nextRef);

console.log(this.props);
}

renderImage() {
  //gets gender to display either girl or boy
  const gender = 'male';
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  const icon = gender === 'female' ? require('./images/girlstud.png') : require('./images/astudquestion.png');
  return (
    <Image
      style={styles.imageStyle}
      source={icon}
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
          <Image
            style={styles.imageStyle}
            source={require('./images/emptyLine.png')}
          />
        </View>

        <View style={styles.infoView}>
          <Text style={styles.textStyle}>{this.props.first}</Text>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.buttonView}>
          <Button onPress={this.onQuitPress.bind(this)}>
            QUIT
          </Button>
          <ButtonTextGreen disabled onPress={this.onNextPress.bind(this)}>
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

        <View style={styles.infoView}>
          <Text style={styles.textStyle}>{this.props.first}</Text>
        </View>

        <View style={styles.ContainerView}>
        <View>
              <Text style={styles.textStyle2}>Students in line: </Text>
            </View>
            <View>
              <Text style={styles.textStyle2}>
                {this.props.studasscount}
              </Text>
            </View>
        </View>

        <View style={styles.buttonView}>
          <Button onPress={this.onQuitPress.bind(this)}>
            QUIT
          </Button>
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
      alignItems: 'flex-start',
    },
    infoView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5
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
      fontSize: 25
    },
    textStyle2: {
      fontSize: 18
    }

  };

const mapStateToProps = state => {
  //henter ut listen fra reduceren studassqueue
  const queue = _.map(state.studassQueue, (val, uid) => {
    return { ...val, uid };
  });
//henter ut studascount fra reduceren count
  const { studasscount } = state.count;
  const { first, myLocation, studSubject } = state.createQueue;
  return { queue, studasscount, first, myLocation, studSubject };
};
 //kan skrive queue[0].name

export default connect(mapStateToProps, { fetchQueue, getCount, deleteQueue, nextDelete, firstInLine })(StudassQueue);
