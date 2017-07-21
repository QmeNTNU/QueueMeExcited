import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, Alert, View, Image } from 'react-native';
import { Button } from './common';
import { fetchQueue, getCount, deleteMeFromQueue, findMyPlaceInLine } from '../actions';

class InQueue extends Component {
componentWillMount() {
  const { currentUser } = firebase.auth();
  const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
  //starts the listener for
  this.props.fetchQueue({ ref });
  this.props.getCount({ ref });

  //keep tract on nr user is in line.
  //if this numer is index 0 send notification
}

componentWillReceiveProps(nextProps) {
  //if the queue is deleted, one cant call findIndex because of undefined
  //when we get th eprops from compWillMont we want to get the place
  //but to prevent this to be called in a cycle(every time we update props)
  //we have to add a boolean so it only runds one time
  if (this.props.firstboolean === true) {
    this.props.findMyPlaceInLine(nextProps.queue, this.props.myLocation);
  }
  //after the initial place fetch, we will call once and stop if the next count
  //is equal to the last one.
  if (nextProps.queue.length < this.props.queue.length) {
    //DID NOT WORK IF I USER PROPS.STUDASSCOUNT BECOUSE THEN IT CALLS --
    //-- THE findMyPlaceInLine BEFORE IT GETS THE LIST.
    this.props.findMyPlaceInLine(nextProps.queue, this.props.myLocation);
  }
}

//NEED A ONBACKPRESS


onQuitPress() {
//gets ref to delete (whole node)
 const deleteRef = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue/${this.props.myLocation}`);
//popup dialog to make sure if user wants to quit
  Alert.alert(
  'Warning',
  'You are about to step out of this queue, are you sure you want to do so?',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
      { text: 'Yes', onPress: () => this.props.deleteMeFromQueue(deleteRef) },
    ]
  );
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
  const gender = this.getGender();
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  const icon = gender === 'female' ? require('./images/coffeegirl2.png') : require('./images/coffee3.png');
  return (
    <Image
      style={styles.imageStyle}
      source={icon}
    />
  );
/* eslint-enable global-require */
}

  render() {
      console.log(this.props);
    return (
      <View style={styles.wholeScreen}>

        <View style={styles.infoView}>
          <Text style={styles.textStyle}>You are queued</Text>
          <Text style={styles.textStyle2}>Relax and do your thing</Text>
        </View>

        <View style={styles.imageView}>
          {this.renderImage()}
        </View>

        <View style={styles.ContainerView}>
        <View style={styles.infoView}>
          <Text style={styles.textStyle4}>You are nr: </Text>
        </View>
        <View style={styles.infoView2}>
          <View style={styles.infoView}>
            <Text style={styles.textStyle3}> {this.props.place}</Text>
          </View>
          <View style={styles.infoViewRight}>
            <Text style={styles.textStyle4}>/{this.props.studasscount}</Text>
          </View>
        </View>
        </View>

        <View style={styles.buttonView}>
          <Button onPress={this.onQuitPress.bind(this)}>
            QUIT
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
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5
    },
    infoView2: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    infoViewRight: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginTop: 30
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
      fontSize: 18
    },
    textStyle2: {
      color: '#ffffff',
      fontSize: 25
    },
    textStyle3: {
      fontSize: 50
    },
    textStyle4: {
      fontSize: 20
    }

  };


const mapStateToProps = (state) => {
  //henter ut listen fra reduceren studassqueue
  const queue = _.map(state.studassQueue, (val, uid) => {
    return { ...val, uid };
  });
  //henter ut studascount fra reduceren count
  const { studasscount } = state.count;
  const { myLocation, studassLocation, subject } = state.queueInfo;
  const { place, firstboolean } = state.inQueue;
  return { queue, studasscount, myLocation, place, firstboolean, studassLocation, subject };
};
 //kan skrive queue[0].name

export default connect(mapStateToProps, { fetchQueue, getCount, deleteMeFromQueue, findMyPlaceInLine })(InQueue);
