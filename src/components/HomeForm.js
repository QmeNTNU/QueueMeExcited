import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { studentAssistant, Student, getMyName } from '../actions';


class HomeForm extends Component {

  componentWillMount() {
    //gets users name to NameReducer for later use
    this.props.getMyName();
  }

  onPressStudent() {
    this.props.Student();
  }

  onPressStudentAssistant() {
    this.props.studentAssistant();
  }

  renderImage() {
     /* eslint-disable global-require */
    return (
       <Image style={{ flex: 1, height: undefined, width: undefined }} resizeMode="contain" source={require('./images/home.png')} />
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

            <View style={{ flex: 1 }}>
              <Text style={textStyle} >
                Interrract as either student or student assistant
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
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
};

export default connect(null, {
  Student, studentAssistant, getMyName })(HomeForm);
