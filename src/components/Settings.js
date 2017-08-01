import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ButtonWhite, ButtonRed } from './common';
import {
  DeletePress,
  LogOutPress
} from '../actions';

class Settings extends Component {

  onLogOutPress() {
    this.props.LogOutPress();
  }

  onCancelPress() {
    this.props.cancel();
  }

  onStudPress() {
    Actions.welcome();
  }
  onStudAssPress() {

  }
  onDeletePress() {
    this.props.DeletePress();
  }
  onUsPress() {

  }

  render() {
    return (
        <View style={{ backgroundColor: '#95CAFE', flex: 1, paddingLeft: 20, paddingRight: 20 }}>

            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>

                <View style={styles.containerStyle}>
                  <ButtonWhite onPress={this.onStudPress.bind(this)} >
                    Toturial
                  </ButtonWhite>
                </View>

                <View style={styles.containerStyle}>
                  <ButtonWhite
                    onPress={() => Alert.alert(
                        'You are about to delete your account!',
                        'Are you sure you want to delete it?',
                        [
                          { text: 'Yes', onPress: () => this.onDeletePress() },
                          { text: 'No', onPress: () => this.onCancelPress.bind(this) }
                        ]
                      )}
                  >
                    Delete Account
                  </ButtonWhite>
                </View>

                <View style={styles.containerStyle}>
                  <ButtonWhite onPress={this.onUsPress.bind(this)} >
                    About Us
                  </ButtonWhite>
                </View>

            </View>

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                  <View style={styles.containerStyle}>
                    <ButtonRed
                        onPress={() => Alert.alert(
                              'You are about to log out!',
                              'Are you sure you want to log out?',
                              [
                                { text: 'Yes', onPress: () => this.onLogOutPress() },
                                { text: 'No', onPress: () => this.onCancelPress.bind(this) }
                              ]
                            )}
                        style={styles.buttonStyle}
                    >
                          LOG OUT
                    </ButtonRed>
                  </View>

              </View>

        </View>
    );
  }
}

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    backgroundColor: '#ff0000',
    borderWidth: 1,
    borderColor: '#0000ff',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5
  },
  containerStyle: {
    paddingTop: 10,
    backgroundColor: '#95CAFE',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
};


export default connect(null, {
  LogOutPress,
  DeletePress
})(Settings);
