import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { Button } from './common';
import { setInfo, getCount, addToQueue } from '../actions';

class QueueInfo extends Component {
componentWillMount() {
//setter all info til state
//sette fag til state
const subject = 'TDT4140 ITGK';
this.props.setInfo({ prop: 'subject', value: subject });
//sette studass til state
const studass = 'Geir Ove Hatt';
this.props.setInfo({ prop: 'studass', value: studass });
//sette availible untill til state
const available = '16:00';
this.props.setInfo({ prop: 'available', value: available });

//setter count fra firebase til state
const { currentUser } = firebase.auth();//SHOULD COME FROM STATE/SHARED PREF
const { ref } = firebase.database().ref(`/Person/${currentUser.uid}`);
//starts the listener for
this.props.getCount(ref);
}


onButtonPress() {
  const { currentUser } = firebase.auth();//SHOULD COME FROM STATE/SHARED PREF
  const { ref } = firebase.database().ref(`/Person/${currentUser.uid}`);
  //add user to queue and saves the push location to state
  //this location is used in next scene (in quit queue)
  this.props.addToQueue(ref);
}

renderImage() {
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  return (
    <Image
    style={styles.imageStyle}
    source={require('./images/signqueue.png')}
    />
  );
/* eslint-enable global-require */
}

  render() {
      console.log(this.props);
    return (
    <View style={styles.wholeScreen}>
      <View style={styles.imageView}>
        {this.renderImage()}
      </View>


      <View style={styles.containerStyle}>
        <View style={styles.infoView}>
          <Text style={styles.textStyle2}>Subject</Text>
          <Text style={styles.textStyle}>{this.props.subject}</Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.textStyle2}>Student Assistent</Text>
          <Text style={styles.textStyle}>{this.props.studass}</Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.textStyle2}>People in line</Text>
          <Text style={styles.textStyle}>{this.props.studasscount}</Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.textStyle2}>Available until</Text>
          <Text style={styles.textStyle}>{this.props.available} Oclock </Text>
        </View>

      </View>


      <View style={styles.buttonView}>
        <Button onPress={this.onButtonPress.bind(this)}>
          ADD TO QUEUE
        </Button>
      </View>


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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'contain'

  },
  ContainerView: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoView: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5
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
    fontSize: 25
  },
  textStyle2: {
    color: '#F58C6C'
  }
};

const mapStateToProps = (state) => {
  const { subject, studass, available } = state.queueInfo;
  const { studasscount } = state.count;
  //createQueue is from the reducer/index and is the reucer!
  return { subject, studass, available, studasscount };
};

export default connect(mapStateToProps, { setInfo, getCount, addToQueue })(QueueInfo);
