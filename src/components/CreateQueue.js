import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { availableChanged, roomChanged, makeQueue, checkIfExists } from '../actions';
import { InputCreate, ButtonBlue, Spinner } from './common';

class CreateQueue extends Component {

  componentWillMount() {
    // checks if the queue exists from before
    const { available, room, myGender } = this.props;
    const userUID = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}`);
    this.props.checkIfExists(ref); //calls action to see if the queue already exist
    //
  }

  onAvailableChange(text) { //function that is called for every change in input
    this.props.availableChanged(text); //calls action (createQueueAction.js) to update the state every time the text is changed
  }

  onRoomChange(text) { //function that is called for every change in input
    this.props.roomChanged(text); //calls action (createQueueAction.js) to update the state every time the text is changed
  }


onButtonPress() { //creates/adds the student assistant to the choosen queue
  //retireves the relevant input from state
  const { available, room, myGender, exist } = this.props;
  const userUID = firebase.auth().currentUser.uid;
  //

  //calls action (CreateQueueAction.js) with ref to create/add studass to the queue
  const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}`);
  this.props.makeQueue({ myGender, available, room, ref, exist });
  //
}

  getSubject() {
    const { emnekode, emnenavn } = this.props.subject; //retireves choosen subject info
    return (

        <Text style={{ fontSize: 30 }}> {emnekode} {emnenavn} </Text>

    );
  }

  renderImage() {
    /* eslint-disable global-require */
    return (
      <Image
        style={{ flex: 1, height: undefined, width: undefined }}
        resizeMode="contain"
        source={require('./images/alarm3.png')}
      />
    );
    /* eslint-enable global-require */
  }

  renderArrowDownImage() {
    /* eslint-disable global-require */
    return (
      <Image
      style={styles.imageStyle}
      source={require('./images/arrowdown.png')}
      />
    );
    /* eslint-enable global-require */
  }

  renderButton() {
    if (this.props.loadingButton) { //shows spinner on loading
      return <Spinner size="large" />;
    }
    return ( //shows button when not loading
      <ButtonBlue onPress={this.onButtonPress.bind(this)}>
        START QUEUE
      </ButtonBlue>
    );
  }


  render() {
    return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.select({ ios: () => 0, android: () => -250 })()} style={styles.wholeScreen}>
        <View style={styles.ViewBlue}>
          <Text style={{ alignSelf: 'center', fontFamily: 'bebasNeue', color: '#213140', fontSize: 30 }}>
          {this.getSubject()}
          </Text>
        </View>


        <View style={styles.imageView}>
          {this.renderImage()}
        </View>

        <View style={{ flex: 2, backgroundColor: '#213140', borderRadius: 5, marginLeft: 40, marginRight: 40, paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
          <View style={{ height: 10, alignItems: 'center' }}>
            {this.renderArrowDownImage()}
          </View>

              <View style={styles.infoView}>
              <Text style={styles.textStyle3}>I will be available until</Text>
              </View>

              <View style={styles.ContainerView}>
                  <View style={{ flex: 1, height: 45 }}>
                    <InputCreate
                      placeholder="00:00"
                      keyboardType='default'
                      maxLength={5}
                      width={60}
                      value={this.props.available}
                      onChangeText={this.onAvailableChange.bind(this)}
                    />
                  </View>

                  <View style={styles.infoView}>
                    <Text style={styles.textStyle3}> Oclock in </Text>
                  </View>

                  <View style={{ flex: 1, height: 45 }}>
                    <InputCreate
                      placeholder="room.nr"
                      keyboardType='default'
                      maxLength={10}
                      width={100}
                      value={this.props.room}
                      onChangeText={this.onRoomChange.bind(this)}
                    />
                  </View>
              </View>
          </View>


        <Text style={styles.errorTextStyle}>{this.props.error}</Text>

        <View style={{ flex: 1 }}>
          <Text style={{ color: '#ffffff' }}>
            PLACEHOLDER
          </Text>
        </View>

        <View style={styles.buttonView}>
          {this.renderButton()}
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  wholeScreen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  ViewBlue: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F58C6C'
  },
  imageView: {
    flex: 5,
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'contain',
  },
  ContainerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  buttonView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE'
  },
  textStyle: {
    fontSize: 20,
  },
  textStyle2: {
    color: '#F58C6C',
    fontFamily: 'bebasNeue',
    fontSize: 20,

  },
  textStyle3: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'bebasNeue',

  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#F58C6C',
    backgroundColor: '#ffffff'
  }

};

const mapStateToProps = (state) => {
  const { available, room, loadingButton, error, studassSubject, exist } = state.createQueue;
  const { myGender } = state.nameRed;

  return { available, room, loadingButton, error, studassSubject, myGender, exist };
};

export default connect(mapStateToProps, { availableChanged, roomChanged, makeQueue, checkIfExists })(CreateQueue);
