import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux'; //to get acces to the actioncreater
import { availableChanged, roomChanged, makeQueue } from '../actions'; //all the actions in the actioncreator
import { InputCreate, ButtonBlue, Spinner } from './common';

class CreateQueue extends Component {

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
  const { available, room, myName } = this.props;
  const userUID = firebase.auth().currentUser.uid;
  //NOT RETTRIEVE EVERY TIME
  //WHEN I WANT TO TAKE IN VARIABLES, I NEED TO WRITE IT AS .CHILD
  const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}`);
//calls actioncreater makeQueue with the attribute availible
//MUST VALIDATE
  this.props.makeQueue({ myName, available, room, ref });
}

  getSubject() {
    //Shows the subject stud.ass is about to create a queue in
    //gets the string subject from last page (listview)
    //Actions.com2 ({text: 'Hello World'})
    //this.props.text
    const { emnekode, emnenavn } = this.props.subject;

    return (
      <View style={styles.infoView}>
        <Text style={styles.textStyle}> {emnekode} {emnenavn} </Text>
      </View>
    );
  }

  renderImage() {
    //gets gender to display either girl or boy
    //eslint comments lets us retrieve image!!!
    /* eslint-disable global-require */
    return (
      <Image
        style={styles.imageStyle}
        source={require('./images/alarm3.png')}
      />
    );
  /* eslint-enable global-require */
  }

  renderButton() {
    if (this.props.loading) {
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
      <View style={styles.wholeScreen}>

        <View style={styles.infoView}>
          {this.getSubject()}
        </View>

        <View style={styles.imageView}>
          {this.renderImage()}
        </View>

        <View style={styles.infoView}>
        <Text style={styles.textStyle}>I will be available from now to</Text>
        </View>

        <View style={styles.ContainerView}>
            <InputCreate
              placeholder="00.00"
              keyboardType='numeric'
              maxLength={5}
              width={60}
              value={this.props.available}
              onChangeText={this.onAvailableChange.bind(this)}
            />
          <View style={styles.infoView}>
            <Text style={styles.textStyle}>Oclock</Text>
            <Text style={styles.textStyle}> in</Text>
          </View>
            <InputCreate
              placeholder="room.nr"
              keyboardType='default'
              maxLength={10}
              width={100}
              value={this.props.room}
              onChangeText={this.onRoomChange.bind(this)}
            />
        </View>


        <Text style={styles.errorTextStyle}>{this.props.error}</Text>


        <View style={styles.buttonView}>
          {this.renderButton()}
        </View>

      </View>
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
  imageView: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingLeft: 60,
    paddingRight: 60
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
    fontSize: 20
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
  const { available, room, loading, error, studassSubject } = state.createQueue;
  const { myName } = state.nameRed;

  //createQueue is from the reducer/index and is the reucer!
  return { available, room, loading, error, studassSubject, myName };
};

//have to add on the connector for redux to work
//allows me to get the state from the reducer
export default connect(mapStateToProps, { availableChanged, roomChanged, makeQueue })(CreateQueue);
