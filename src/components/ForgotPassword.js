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
     <Image style={styles.labelStyle} source={require('./images/mail2.png')} />
   );
  /* eslint-enable global-require */
}
renderImage() {
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

render() {
    return (
          <View style={{ backgroundColor: '#95CAFE', flex: 5, alignItems: 'center', justifyContent: 'center', paddingBottom: 20, paddingLeft: 60, paddingRight: 60 }}>

            <View style={{ flex: 1 }} />

                <View style={{ flex: 2 }}>

                  <Text style={{ fontSize: 40, color: '#F58C6C', textAlign: 'center', fontFamily: 'bebasNeue' }}>
                  Forgot password?
                  </Text>

                  <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 20 }}>
                          Enter your registered student-email
                  </Text>

              <View style={{ flex: 1, marginTop: 20 }}>
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

              <View style={styles.textButtonStyle}>
              <TouchableOpacity
                  onPress={() => Actions.login({ type: 'reset' })}
                  style={{ alignItems: 'center', paddingBottom: 5, paddingTop: 5 }}
              >
                <Text style={{ color: '#ffffff' }}>
                  Back to login
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          </View>

          <View style={{ flex: 1 }} />

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
  textButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
