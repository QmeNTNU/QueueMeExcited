import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signup, forgotPasswordClick } from '../actions';
import { InputSignUp, ButtonWhite, Spinner } from './common';

//hei karer

class LoginForm extends Component {
  onEmailChange(text) {
      this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  onPressPassword() {
      this.props.forgotPasswordClick();
  }
  onPressSignup() {
      this.props.signup();
  }
  renderImage() {
    /* eslint-disable global-require */
   return (

    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={require('./images/LOGO2.png')}
    />
    );
   /* eslint-enable global-require */
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


  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <ButtonWhite onPress={this.onButtonPress.bind(this)} >
        LOGIN
      </ButtonWhite>
    );
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.select({ ios: () => 0, android: () => -250 })()} style={{ flex: 1, paddingRight: 50, paddingLeft: 50, paddingBottom: 20, backgroundColor: '#95CAFE' }}>

        <View style={styles.ImageViewStyle}>
        {this.renderImage()}
        </View>




        <View style={{ flex: 2, justifyContent: 'center' }}>
            <View style={styles.containerStyle}>
              <InputSignUp
                label={this.renderEmailImage()}
                placeholder="email@stud.ntnu.no"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email} //input verdi for email
              />
            </View>

            <View style={styles.containerStyle}>
              <InputSignUp
                label={this.renderPasswordImage()}
                secureTextEntry
                placeholder="password"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </View>

          <View style={styles.containerStyle}>
              {this.renderButton()}
          </View>

          <View style={styles.textButtonStyle}>
            <TouchableOpacity
                onPress={this.onPressSignup.bind(this)}
                style={{ alignItems: 'center', paddingBottom: 5, paddingTop: 5 }}
            >
              <Text style={{ color: '#ffffff' }}>
                Sign up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={this.onPressPassword.bind(this)}
                style={{ alignItems: 'center', paddingBottom: 5, paddingTop: 5 }}
            >
              <Text style={{ color: '#ffffff' }}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    height: 50,
    paddingBottom: 2,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  textButtonStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 2,
  },
  ImageViewStyle: {
    flex: 3,

  },
  imageStyle: {
    flex: 1,
    height: 300,

    resizeMode: 'contain',
    alignSelf: 'center',

  },
  labelStyle: {
    flex: 1,
    resizeMode: 'contain',
    height: 50,
    width: 50,
  },
};

const mapStateToProps = ({ auth }) => {
  const { email, password, loading } = auth;
  return {
    email,
    password,
    loading
  };
};

export default connect(mapStateToProps, {
   emailChanged, passwordChanged, loginUser, signup, forgotPasswordClick
  })(LoginForm);
