import React, { Component } from 'react';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';

import { studentAssistant, Student, getMyName, setInfo, studassSubject, setMyLocation, getMyGender, fetchPlayerId, fetchCode, fetchLocalPlayerId } from '../actions';



class HomeForm extends Component {

  componentWillMount() {
    //checks if user was engaged in activity before closing app, and restores it
    this.checkRecover();
    Actions.refresh({ renderRightButton: this.renderRightButton });
  }
  componentDidMount() {
    //checks if it should display welcomeslides
    this.props.fetchCode();
    this.props.getMyGender();
    this.getPlayerId();
    this.checkWelcomeSlides();
    const user = firebase.auth().currentUser.displayName;
    console.log('FIREBASE USER NAME', user);
  }
  onPressStudent() {
    this.props.Student();
  }

  onPressStudentAssistant() {
    if (this.props.retrievedCode !== '8825') {
      Actions.lock();
    } else {
      this.props.studentAssistant();
    }
  }

  async getPlayerId() {
    try {
        const playerid = await AsyncStorage.getItem('LocalPlayerId');
        if (playerid !== null) {
          // We have data!!
          console.log('LOCALPLAYERIDFETCHED', playerid);
          this.props.fetchLocalPlayerId(playerid);
        } else {
          //get data another way
          console.log('SHOULD NOT HAPPEN');
          this.props.fetchPlayerId();
        }
      } catch (error) {
        // Error retrieving data
      }
  }

async checkWelcomeSlides() {
 try {
    const value = await AsyncStorage.getItem('displaySlides');
    if (value === null) {
      //sets displaySlides to NOT so it doesent show welcomeslides again
      this.setWelcomeSlides();
      console.log('COMDIDMOUNT', value);
      Actions.welcome();
    }
  } catch (error) {
    // Error retrieving data
  }
}

async setWelcomeSlides() {
  try {
        await AsyncStorage.setItem('displaySlides', 'NOT');
      } catch (error) {
        // Error saving data
      }
}

  async checkRecover() {
    console.log('Checkrecover');

    if (this.props.myName === '') { //only suppose to run fuction if it is the first open after app-restart
      try {
        //retireves values last recordetbefore evt crash stored to async storadge
    const asyncStudentSubject = await AsyncStorage.getItem('asyncStudentSubject');
    const asyncStudentstudassLocation = await AsyncStorage.getItem('asyncStudentstudassLocation');
    const asyncStudentmyLocation = await AsyncStorage.getItem('asyncStudentmyLocation');
    const asyncStudassSubject = await AsyncStorage.getItem('asyncStudassSubject');
    //IF ONE IS NOT NULL, IT CHECKS BOTH IF IT
        if (asyncStudentSubject !== null || asyncStudassSubject !== null) {
          // We have data!!
          console.log('ASYNCDATA: ', asyncStudentSubject);
          console.log('ASYNCDATA: ', asyncStudentstudassLocation);
          console.log('ASYNCDATA: ', asyncStudentmyLocation);
          console.log('ASYNCDATA: ', asyncStudassSubject);
    ///////////////////////CHECKS IF EXIST AS STUDENT assistant//////////////////////////////////
          const userUID = firebase.auth().currentUser.uid;
          const ref = firebase.database().ref(`Subject/${asyncStudassSubject}/studasslist`);
                ref.once('value', snapshot => { // only called once
              console.log(snapshot.val() === null);
              //if the queue is empty ( in case studass deletes it)
              //we jump over iterating becouse we know we are not there
              if (snapshot.val() === null) {
                return true;
              }
              snapshot.forEach(childSnapshot => {
                //should recover studasqueue if userid existst at location
                console.log('CHILD_UID', childSnapshot.val().userUID);
                console.log('MY_UID', userUID);

                if (userUID === childSnapshot.val().userUID) {
                  //sets needed values to state
                  this.props.studassSubject(asyncStudassSubject);
                  //continues queue
                  Actions.studassQueue({ type: 'reset' });
                }
                //if it doesent find anything, it is all good
              });
            });
        ///////////////////////////////////////////////////////////////////////////////////////
        ////////////////CHECKS IF ADDED TO A LINE/////////////////////////////////////////////
        const studRef = firebase.database().ref(`Subject/${asyncStudentSubject}/studasslist/${asyncStudentstudassLocation}/queue`);
              studRef.once('value', snapshot => { // only called once
            console.log(snapshot.val() === null);
            //if the queue is empty ( in case studass deletes it)
            //we jump over iterating becouse we know we are not there
            if (snapshot.val() === null) {
              return true;
            }
            snapshot.forEach(childSnapshot => {
              //should recover studasqueue if userid existst at location
              console.log('CHILD_UID', childSnapshot.val().userUID);
              console.log('MY_UID', userUID);

              if (userUID === childSnapshot.val().userUID) {
                //sets needed values to state
                this.props.setInfo({ prop: 'studassLocation', value: asyncStudentstudassLocation });
                this.props.setInfo({ prop: 'subject', value: asyncStudentSubject });
                this.props.setMyLocation(asyncStudentmyLocation);

                //continues queue
                Actions.inQueue({ type: 'reset' });
              }
              //if it doesent find anything, it is all good
            });
          });
        ///////////////////////////////////////////////////////////////////////////////
        //have to get my name, cant do it before because then the obove function wouldnt run
        //gets users name to NameReducer for later use
        this.props.getMyName();
        }
      } catch (error) {
        // Error retrieving data
      }
    }
  }
  renderRightButton = () => {
    /* eslint-disable global-require */
    return (
        <TouchableOpacity onPress={() => Actions.settings()}>
          <Image
            style={{ height: 20, width: 20 }}
            resizeMode="contain"
            source={require('./images/settings.png')}
          />
        </TouchableOpacity>
    );
    /* eslint-enable global-require */
};
    renderImage() {
       /* eslint-disable global-require */
      return (
         <Image style={{ flex: 1, height: undefined, width: undefined }} resizeMode="contain" source={require('./images/home3.png')} />
       );
      /* eslint-enable global-require */
    }

  render() {
    const { buttonStyle, textStyle, containerStyle } = styles;
    return (

        <View
          style={{
          backgroundColor: '#95CAFE',
          flex: 1,
        }}
        >
            <View style={{ flex: 1 }}>
              {this.renderImage()}
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={textStyle} >
                Interract as either student or student assistant
              </Text>

              <View style={containerStyle}>
                <TouchableOpacity onPress={this.onPressStudent.bind(this)} style={buttonStyle} >
                 <Text style={textStyle}>
                    Student
                 </Text>
                </TouchableOpacity>
              </View>

              <View style={containerStyle} >
                <TouchableOpacity onPress={this.onPressStudentAssistant.bind(this)} style={buttonStyle} >
                 <Text style={textStyle}>
                    Student Assistant
                 </Text>
                </TouchableOpacity>
              </View>
            </View>

        </View>
    );
  }
}
//fontFamily: 'bebasNeue'
const styles = {
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'bebasNeue',

  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    backgroundColor: '#95CAFE',
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20
  },
  containerStyle: {
    backgroundColor: '#95CAFE',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative'
  }
};
const mapStateToProps = state => {
  //fetches name to check if it is null (first time after closing app totally)
  const { myName } = state.nameRed;
  const { retrievedCode } = state.lock;

  return { myName, retrievedCode };
};
export default connect(mapStateToProps, {

Student, studentAssistant, getMyName, setInfo, studassSubject, setMyLocation, getMyGender, fetchPlayerId, fetchCode, fetchLocalPlayerId })(HomeForm);
