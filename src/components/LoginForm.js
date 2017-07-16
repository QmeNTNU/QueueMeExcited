import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signup, forgotPasswordClick } from '../actions';
import { Input1, Button1, Spinner } from './common';

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
       <Image style={{ width: 190, height: 190 }} source={require('./images/login.png')} />
     );
    /* eslint-enable global-require */
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
       <Image style={styles.labelStyle} source={require('./images/key2.png')} />
     );
    /* eslint-enable global-require */
  }
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button1 onPress={this.onButtonPress.bind(this)} >
        LOGIN
      </Button1>
    );
  }
  render() {
    return (
      <View style={{ backgroundColor: '#95CAFE', flex: 1 }}>

          <View style={styles.imageStyle}>
            {this.renderImage()}
          </View>

        <View style={{ flex: 2 }}>
            <View style={styles.containerStyle}>
              <Input1
                label={this.renderEmailImage()}
                placeholder="email@stud.ntnu.no"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email} //input verdi for email
              />
            </View>

            <View style={styles.containerStyle}>
              <Input1
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

            <TouchableOpacity
                onPress={this.onPressPassword.bind(this)}
                style={{ alignItems: 'center', paddingBottom: 20, paddingTop: 20 }}
            >
              <Text style={{ color: '#0000ff' }}>
                FORGOT YOUR PASSWORD?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={this.onPressSignup.bind(this)}
                style={{ alignItems: 'center', paddingBottom: 20, paddingTop: 30 }}
            >
              <Text style={{ color: '#F58C6C', fontSize: 20 }}>
                NOT REGISTERED? CLICK HERE!
              </Text>
            </TouchableOpacity>
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
  imageStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'

  },
  labelStyle: {
    flex: 1,
    //resizeMode: 'contain',
    height: 132,
    width: 150,
  }
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
