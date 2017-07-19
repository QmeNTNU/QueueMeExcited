import React, { Component } from 'react';
import { Text, View, Picker, TouchableOpacity, Image } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  SignupEmailChanged,
  SignupPasswordChanged,
  fullnameChanged,
  confirmPasswordChanged,
  createUser,
  genderUpdate,
  login,
} from '../actions';
import { InputSignUp, ButtonWhite, Spinner } from './common';


class SignUpForm extends Component {
  onFullnameChange(text) {
    this.props.fullnameChanged(text);
  }
  onSignupEmailChange(text) {
      this.props.SignupEmailChanged(text);
  }
  onSignupPasswordChange(text) {
    this.props.SignupPasswordChanged(text);
  }
  onConfirmPasswordChange(text) {
    this.props.confirmPasswordChanged(text);
  }
  onButtonPress() {
    const { signupEmail, signupPassword, confirmPassword, fullname, gender } = this.props;
    this.props.createUser({ signupEmail, signupPassword, confirmPassword, fullname, gender });
 }
 onPressLogin() {
  this.props.login();
 }
 renderButton() {
   if (this.props.loading) {
     return <Spinner size="large" />;
   }
   return (

       <ButtonWhite onPress={this.onButtonPress.bind(this)} >
         REGISTRER
       </ButtonWhite>

   );
 }
 renderEmailImage() {
    /* eslint-disable global-require */
   return (
      <Image style={styles.labelStyle} source={require('./images/mail.png')} />
    );
   /* eslint-enable global-require */
 }

 renderPasswordImage() {
    /* eslint-disable global-require */
   return (
      <Image style={styles.labelStyle} source={require('./images/lock.png')} />
    );
   /* eslint-enable global-require */
 }

  renderPersonImage() {
     /* eslint-disable global-require */
    return (
       <Image style={styles.labelStyle} source={require('./images/name2.png')} />
     );
    /* eslint-enable global-require */
  }
 renderImage() {
    /* eslint-disable global-require */
   return (
      <Image style={styles.imageStyle} source={require('./images/lock.png')} />
    );
   /* eslint-enable global-require */
 }

  render() {
    return (
      <View style={{ backgroundColor: 'rgb(149, 202, 254)', flex: 1 }}>

        <View style={{ justifyContent: 'space-between', flex: 4, padding: 20 }}>
          <View style={styles.containerStyle} />

          <View style={styles.containerStyle}>
          <Text style={{ fontSize: 30, color: '#F58C6C' }}>
            Sign Up
          </Text>
        </View>
           <View style={styles.containerStyle}>
             <InputSignUp
              label={this.renderPersonImage()}
               placeholder="Ola Nordmann"
               onChangeText={this.onFullnameChange.bind(this)}
               value={this.props.fullname} //input verdi for fullname
               borderRadius={5}
             />
           </View>

          <View style={styles.containerStyle}>
            <InputSignUp
              label={this.renderEmailImage()}
              placeholder="email@stud.ntnu.no"
              onChangeText={this.onSignupEmailChange.bind(this)}
              value={this.props.signupEmail} //input verdi for email
            />
          </View>

          <View style={styles.containerStyle}>
            <InputSignUp
              label={this.renderPasswordImage()}
              secureTextEntry
              placeholder="password"
              onChangeText={this.onSignupPasswordChange.bind(this)}
              value={this.props.signupPassword}
            />
          </View>

          <View style={styles.containerStyle}>
            <InputSignUp
              label={this.renderPasswordImage()}
              secureTextEntry
              placeholder=" confirm password"
              onChangeText={this.onConfirmPasswordChange.bind(this)}
              value={this.props.confirmPassword}
              borderRadius={5}
            />
          </View>

          <View style={styles.sectionStyle}>
            <Picker
            style={styles.pickerStyle}
            selectedValue={this.props.gender}
            onValueChange={gender => this.props.genderUpdate({ prop: 'gender', value: gender })}
            >
              <Picker.Item label="                             -select a gender-" value="" />
              <Picker.Item label="                                       male" value="male" />
              <Picker.Item label="                                      female" value="female" />
            </Picker>
          </View>

          <View style={styles.containerStyle}>
              {this.renderButton()}
          </View>

        <TouchableOpacity
            onPress={this.onPressLogin.bind(this)}
            style={{ flex: 1, alignItems: 'center', paddingBottom: 20, paddingTop: 20 }}
        >
          <Text style={{ color: '#ffffff', flex: 1 }}>
              ALREADY GOT AN ACCOUNT? CLICK HERE!
          </Text>
        </TouchableOpacity>


        </View>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#fff',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    textAlign: 'center'
  },
  sectionStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row', //ordnes horisontalt
    alignItems: 'flex-start',
    backgroundColor: '#95CAFE'
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 2,
    position: 'relative'
  },
  pickerStyle: {
     flex: 1,
     backgroundColor: '#fff',
     borderRadius: 5,
     borderWidth: 1,
     borderColor: '#007aff'
  },
  labelStyle: {
    flex: 1,
    resizeMode: 'contain',
    height: 50,
    width: 50,
  },
  imageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
};

//konstaneter vi skal ha med oss videre
const mapStateToProps = ({ reg }) => {
  const { signupEmail, signupPassword, confirmPassword, fullname, gender, loading } = reg;
  return {
    signupEmail,
    signupPassword,
    confirmPassword,
    fullname,
    gender,
    loading
  };
};


export default connect(mapStateToProps, {
  SignupEmailChanged,
  SignupPasswordChanged,
  fullnameChanged,
  confirmPasswordChanged,
  createUser,
  genderUpdate,
  login
})(SignUpForm);
