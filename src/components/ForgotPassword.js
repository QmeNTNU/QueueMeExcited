import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { resetEmailChange, resetPasswordButtonPress } from '../actions';
import { Input1, Button1 } from './common';

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
          <View style={{ backgroundColor: '#95CAFE', flex: 1 }}>

              <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                {this.renderImage()}
              </View>

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontWeight: 400 }}>
                <Text style={{ color: '#fff', fontSize: 22 }}>
                Forgot your password?
                </Text>

                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
                        Enter your registered student-email and follow the given instructions to
                        take back controll of your account!
                </Text>
              </View>

              <View style={{ flex: 2, justifyContent: 'center' }}>
                <View style={styles.containerStyle}>
                  <Input1
                    label={this.renderEmailImage()}
                    placeholder="enter student-email"
                    onChangeText={this.onResetEmailChange.bind(this)}
                    value={this.props.resetEmail} //input verdi for email
                  />
                </View>

                <View style={styles.containerStyle}>
                  <Button1 onPress={this.onResetPasswordButtonPress.bind(this)} >
                    SEND EMAIL
                  </Button1>
                </View>
              </View>

          </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#95CAFE',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  labelStyle: {
    flex: 1,
    //resizeMode: 'contain',
    height: 132,
    width: 150,
  }
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
