import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import CheckBox from 'react-native-check-box'
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
         REGISTER
       </ButtonWhite>

   );
 }
 renderEmailImage() {
    /* eslint-disable global-require */
   return (
     <Image
       style={{ flex: 1, height: undefined, width: undefined }}
       resizeMode="contain"
       source={require('./images/mail2.png')}
     />
    );
   /* eslint-enable global-require */
 }

 renderPasswordImage() {
    /* eslint-disable global-require */
   return (
     <Image
       style={{ flex: 1, height: undefined, width: undefined }}
       resizeMode="contain"
       source={require('./images/lock2.png')}
     />
    );
   /* eslint-enable global-require */
 }

  renderPersonImage() {
     /* eslint-disable global-require */
    return (
      <Image
        style={{ flex: 1, height: undefined, width: undefined }}
        resizeMode="contain"
        source={require('./images/name3.png')}
      />
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

 checkMale() {
   if (this.props.gender === 'male') {
     this.props.genderUpdate({ prop: 'gender', value: '' });
   } else {
   this.props.genderUpdate({ prop: 'gender', value: 'male' });
  }
 }
 checkFemale() {
   if (this.props.gender === 'female') {
     this.props.genderUpdate({ prop: 'gender', value: '' });
   } else {
   this.props.genderUpdate({ prop: 'gender', value: 'female' });
  }
 }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.select({ ios: () => 0, android: () => -250 })()} style={{ backgroundColor: 'rgb(149, 202, 254)', flex: 1 }}>

        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 4, paddingBottom: 20, paddingRight: 50, paddingLeft: 50 }}>

          <View style={{ height: 60 }}>
            <Text style={{ fontSize: 50, color: '#F58C6C', fontFamily: 'bebasNeue' }}>
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
              placeholder="confirm password"
              onChangeText={this.onConfirmPasswordChange.bind(this)}
              value={this.props.confirmPassword}
              borderRadius={5}
            />
          </View>

          <Text > Gender (optional): </Text>
          <View style={styles.sectionStyleContainer}>

          <View style={styles.sectionStyle}>
            <CheckBox
                style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}
                onClick={this.checkMale.bind(this)}
                isChecked={this.props.gender === 'male'}
                leftText='Male'
            />
          </View>
            <View style={styles.sectionStyle}>

            <CheckBox
                style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}
                onClick={this.checkFemale.bind(this)}
                isChecked={this.props.gender === 'female'}
                leftText='Female'
            />
          </View>
        </View>

          <View style={styles.containerStyle}>
              {this.renderButton()}
          </View>

        <TouchableOpacity
            onPress={this.onPressLogin.bind(this)}
            style={{ alignItems: 'flex-start', paddingBottom: 5, paddingTop: 5}}
        >
          <Text style={{ color: '#ffffff' }}>
              Back to login
          </Text>
        </TouchableOpacity>


        </View>
      </KeyboardAvoidingView>
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
  sectionStyleContainer: {
    height: 50,
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 2,
    position: 'relative',
  },
  sectionStyle: {
    height: 50,
    width: 73,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 2,
    position: 'relative',
  },
  containerStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 2,
    position: 'relative'
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
