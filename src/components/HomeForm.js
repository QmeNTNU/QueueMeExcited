import React, { Component } from 'react';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { studentAssistant, Student, getMyName, setInfo, studassSubject, setMyLocation, getMyGender, fetchPlayerId, fetchCode, fetchLocalPlayerId } from '../actions';

class HomeForm extends Component {

  componentWillMount() {
    this.checkRecover(); //checks if user was engaged in activity before closing app, and restores it
    Actions.refresh({ renderRightButton: this.renderRightButton }); //function to refresh the "settings" icon manually becous of router problems
  }

  componentDidMount() {
    this.props.fetchCode();//calls action to retireve studasscode
    this.props.getMyGender(); //calls action to retrive users gender
    this.getPlayerId(); //calls function below to retrieve users playerid
    this.checkWelcomeSlides(); //checks if it is the first time on the app (for turtorialslides)

    const user = firebase.auth().currentUser.displayName;
    console.log('FIREBASE USER NAME', user);
  }
  onPressStudent() {
    this.props.Student(); //calls action (HomeFormActions.js) to router to student functons
  }

  onPressStudentAssistant() {
    //if user do not have code, send to lock screen.
    if (this.props.retrievedCode !== '8825') {
      Actions.lock();
    } else {
      this.props.studentAssistant(); //Or else calls action (HomeFormActions.js) to router to studass functons
    }
  }

  async getPlayerId() { //retireves users player id
    try {
        const playerid = await AsyncStorage.getItem('LocalPlayerId');
        if (playerid !== null) { // We have data!!
          console.log('LOCALPLAYERIDFETCHED', playerid);
          this.props.fetchLocalPlayerId(playerid); //calls action (QueueInfoAction.js) to retireve playerid from firebase
        } else { //get data from firebase
          console.log('SHOULD NOT HAPPEN');
          this.props.fetchPlayerId(); //calls action (QueueInfoAction.js) to retireve playerid from firebase
        }
      } catch (error) {
        // Error retrieving data
      }
  }

async checkWelcomeSlides() { //checks in AsyncStoradge if the slides ha been showed before. If do, do not show again
 try {
    const value = await AsyncStorage.getItem('displaySlides');
    if (value === null) { //we dont have data so we want to display slides
      this.setWelcomeSlides(); //calls displaySlides belowT so it doesent show welcomeslides after this time
      Actions.welcome(); //router to welcomeslide (modal.js)
    }
  } catch (error) {
    // Error retrieving data
  }
}

async setWelcomeSlides() { //sets asyncStoradge value to NOT (could be anything) so welcomeslides is not shown again
  try {
        await AsyncStorage.setItem('displaySlides', 'NOT');
      } catch (error) {
        // Error saving data
      }
}

renderRightButton = () => { //function called in componentWillMount() to update "setting" icon
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

  async checkRecover() { //checks if user was in activity before closing and restores
    console.log('Checkrecover');

    if (this.props.myName === '') { //only suppose to run this function if it is the first open after app-restart
      try {
        //retireves the last recorded values before user might have crashed from async storadge
        const asyncStudentSubject = await AsyncStorage.getItem('asyncStudentSubject');
        const asyncStudentstudassLocation = await AsyncStorage.getItem('asyncStudentstudassLocation');
        const asyncStudentmyLocation = await AsyncStorage.getItem('asyncStudentmyLocation');
        const asyncStudassSubject = await AsyncStorage.getItem('asyncStudassSubject');
        //

      //if values are not null for student or studass the app crashed and we must restore activity
        if (asyncStudentSubject !== null || asyncStudassSubject !== null) {
          // We have data!!
          console.log('ASYNCDATA: ', asyncStudentSubject);
          console.log('ASYNCDATA: ', asyncStudentstudassLocation);
          console.log('ASYNCDATA: ', asyncStudentmyLocation);
          console.log('ASYNCDATA: ', asyncStudassSubject);
      //

    ///////////////////////checks if user currently exists as student assistant//////////////////////////////////
          const userUID = firebase.auth().currentUser.uid;
          const ref = firebase.database().ref(`Subject/${asyncStudassSubject}/studasslist`);
                ref.once('value', snapshot => { // only called once
              console.log(snapshot.val() === null);
              //if the queue is empty (in case studass deletes it)
              //we jump over iterating by returning true becouse we know we are not there
              if (snapshot.val() === null) {
                return true;
              }
              //

              //if not null and the userid exist the app crashed and we need to recover the session
              snapshot.forEach(childSnapshot => {
                console.log('CHILD_UID', childSnapshot.val().userUID);
                console.log('MY_UID', userUID);

                if (userUID === childSnapshot.val().userUID) {
                  this.props.studassSubject(asyncStudassSubject); //sets needed values to state
                  Actions.studassQueue({ type: 'reset' }); //router back to the restored queue
                }
                //if it doesent find anything, it is all good
              });
              //
            });
        ///////////////////////////////////////////////////////////////////////////////////////
        ////////////////checks if the user currently exists in a line//////////////////////////
        const studRef = firebase.database().ref(`Subject/${asyncStudentSubject}/studasslist/${asyncStudentstudassLocation}/queue`);
              studRef.once('value', snapshot => { // only called once
            console.log(snapshot.val() === null);
            //if the queue is empty ( in case studass deletes it)
            //we jump over iterating becouse we know we are not there
            if (snapshot.val() === null) {
              return true;
            }
            //
            //if the user exist at in this queue one should send them to the queue
            snapshot.forEach(childSnapshot => {
              console.log('CHILD_UID', childSnapshot.val().userUID);
              console.log('MY_UID', userUID);

              if (userUID === childSnapshot.val().userUID) {
                //sets needed values to state
                this.props.setInfo({ prop: 'studassLocation', value: asyncStudentstudassLocation });
                this.props.setInfo({ prop: 'subject', value: asyncStudentSubject });
                this.props.setMyLocation(asyncStudentmyLocation);
                //
                Actions.inQueue({ type: 'reset' }); //sends student back in line
              }
              //if it doesent find anything, it is all good
            });
            //
          });
        ///////////////////////////////////////////////////////////////////////////////

        //Also have to get users name, cant do it before because then the obove function wouldnt run
        this.props.getMyName(); //calls action (getNameAction.js) to retireve users name
        }
      } catch (error) {
        // Error retrieving data
      }
    }
  }

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

const mapStateToProps = state => { //retireves state form redux
  const { myName } = state.nameRed;
  const { retrievedCode } = state.lock;

  return { myName, retrievedCode };
};

export default connect(mapStateToProps, {
Student, studentAssistant, getMyName, setInfo, studassSubject, setMyLocation, getMyGender, fetchPlayerId, fetchCode, fetchLocalPlayerId })(HomeForm);
