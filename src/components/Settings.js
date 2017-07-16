import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button1 } from './common';
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
        <View style={{ backgroundColor: 'rgb(149, 202, 254)', flex: 1 }}>

            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>

                <View style={styles.containerStyle}>
                  <Button1 onPress={this.onStudPress.bind(this)} >
                    Toturial Student
                  </Button1>
                </View>

                <View style={styles.containerStyle}>
                  <Button1 onPress={this.onStudAssPress.bind(this)} >
                    Toturial Student Assistant
                  </Button1>
                </View>

                <View style={styles.containerStyle}>
                  <Button1
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
                  </Button1>
                </View>

                <View style={styles.containerStyle}>
                  <Button1 onPress={this.onUsPress.bind(this)} >
                    About Us
                  </Button1>
                </View>

            </View>

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                  <View style={styles.containerStyle}>
                    <TouchableOpacity
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
                      <Text style={styles.textStyle}>
                          LOG OUT
                      </Text>
                    </TouchableOpacity>
                  </View>

              </View>

        </View>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
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
