import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux'; //to get acces to the actioncreater
import { availableChanged, roomChanged, makeQueue, checkIfExists } from '../actions'; //all the actions in the actioncreator
import { InputCreate, ButtonBlue, Spinner } from './common';

class CreateQueue extends Component {
  componentWillMount(){
    // checks if the queue exists from before
    const { available, room, myGender } = this.props;
    const userUID = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}`);
    this.props.checkIfExists(ref);
  }
//calls the reducer to update the state every time the text is changed
  onAvailableChange(text) {
    this.props.availableChanged(text);
  }

  onRoomChange(text) {
    this.props.roomChanged(text);
  }

//adds the student assistant to the queue
onButtonPress() {
  //retireves the availible input from state
  const { available, room, myGender, exist } = this.props;
  const userUID = firebase.auth().currentUser.uid;
  //NOT RETTRIEVE EVERY TIME
  //WHEN I WANT TO TAKE IN VARIABLES, I NEED TO WRITE IT AS .CHILD
  const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}`);
//calls actioncreater makeQueue with the attribute availible
//MUST VALIDATE
  this.props.makeQueue({ myGender, available, room, ref, exist });
}

  getSubject() {
    //Shows the subject stud.ass is about to create a queue in
    //gets the string subject from last page (listview)
    //Actions.com2 ({text: 'Hello World'})
    //this.props.text
    const { emnekode, emnenavn } = this.props.subject;

    return (

        <Text style={{ fontSize: 30 }}> {emnekode} {emnenavn} </Text>

    );
  }

  renderImage() {
    //gets gender to display either girl or boy
    //eslint comments lets us retrieve image!!!
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
    //eslint comments lets us retrieve image!!!
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
    if (this.props.loadingButton) {
      return <Spinner size="large" />;
    }
    return (
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

//my styles
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

//gets the updated value from the reducer
const mapStateToProps = (state) => {
  const { available, room, loadingButton, error, studassSubject, exist } = state.createQueue;
  const { myGender } = state.nameRed;

  //createQueue is from the reducer/index and is the reucer!
  return { available, room, loadingButton, error, studassSubject, myGender, exist };
};

//have to add on the connector for redux to work
//allows me to get the state from the reducer
export default connect(mapStateToProps, { availableChanged, roomChanged, makeQueue, checkIfExists })(CreateQueue);
