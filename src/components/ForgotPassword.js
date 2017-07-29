import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { resetEmailChange, resetPasswordButtonPress } from '../actions';
import { InputSignUp, ButtonWhite } from './common';

class ForgotPassword extends Component {
  onResetEmailChange(text) {
      this.props.resetEmailChange(text);
  }

onResetPasswordButtonPress() {
  const { resetEmail } = this.props;
    this.props.resetPasswordButtonPress(({ resetEmail }));
}

renderEmailImage() {
   /* eslint-disable global-require */
  return (
     <Image style={styles.labelStyle} source={require('./images/mail.png')} />
   );
  /* eslint-enable global-require */
}
renderImage() {
   /* eslint-disable global-require */
  return (
     <Image style={{ width: 190, height: 190 }} source={require('./images/question.jpg')} />
   );
  /* eslint-enable global-require */
}

render() {
    return (
          <View style={{ backgroundColor: '#95CAFE', flex: 1, padding: 20 }}>


              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, color: '#F58C6C' }}>
                Forgot your password?
                </Text>

                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
                        Enter your registered student-email and follow the given instructions to
                        take back controll of your account!
                </Text>
              </View>

              <View style={{ flex: 2, justifyContent: 'center' }}>
                <View style={styles.containerStyle}>
                  <InputSignUp
                    label={this.renderEmailImage()}
                    placeholder="enter student-email"
                    onChangeText={this.onResetEmailChange.bind(this)}
                    value={this.props.resetEmail} //input verdi for email
                  />
                </View>

                <View style={styles.containerStyle}>
                  <ButtonWhite onPress={this.onResetPasswordButtonPress.bind(this)} >
                    SEND EMAIL
                  </ButtonWhite>
                </View>

              <View style={styles.loginButtonStyle}>
              <TouchableOpacity
                  onPress={() => Actions.login({ type: 'reset' })}
                  style={{ alignItems: 'flex-start' }}
              >
                <Text style={{ color: '#ffffff', fontSize: 20 }}>
                  Back to login
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1, 
    backgroundColor: '#95CAFE',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingBottom: 2,
    position: 'relative'
  },
  labelStyle: {
    flex: 1,
    resizeMode: 'contain',
    height: 50,
    width: 50,
  },
  loginButtonStyle: {
    backgroundColor: '#95CAFE',
    justifyContent: 'flex-start',
      alignItems: 'center',

    paddingBottom: 2,
  },
};

const mapStateToProps = ({ resetPassword }) => {
  const { resetEmail } = resetPassword;
    return {
        resetEmail
    };
};

export default connect(mapStateToProps, {
  resetEmailChange, resetPasswordButtonPress
})(ForgotPassword);
