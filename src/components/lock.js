import React, { Component, } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Modal, Text, View, Image, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ButtonWhite, InputSignUp } from './common';
import { addCode, codeChanged } from '../actions';


class lock extends Component {

  state = { modalVisible: this.props.visible, height: '', width: '' };

  componentWillMount() {
    //retireves dimension of screen to make sure views fits
    const { height, width } = Dimensions.get('window');
    this.setState({ height, width });
  }

  onCodeChange(text) {
    this.props.codeChanged(text);
  }

  onButtonPress() {
    const { code } = this.props;
    this.props.addCode({ code });
  }

  setModalVisible() {
    this.setState({ modalVisible: true });
  }
  setModalInvisible() {
    this.setState({ modalVisible: false });
  }

  renderImage() {
     /* eslint-disable global-require */
    return (
      <Image
        style={{ flex: 1, height: undefined, width: undefined }}
        resizeMode="contain"
        source={require('./images/lock.png')}
      />
     );
    /* eslint-enable global-require */
  }

  /* eslint-disable global-require */
  render() {
    return (
      <View>
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log('MODAL CLOSED'); }}
        >
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.select({ ios: () => 0, android: () => -250 })()} style={styles.wholeScreen}>

                <View style={styles.slideWelcome}>
                <Image
                  style={styles.imageStyle}
                  source={require('./images/code3.png')}
                />
                  <View style={styles.slide3}>
                  <Text style={styles.textOrange}>Enter code</Text>
                  <View style={{ width: 250 }}>
                    <View style={{ height: 50, marginBottom: 5 }}>
                    <InputSignUp
                      style={{ marginBottom: 10 }}
                     label={this.renderImage()}
                      placeholder="Studass code"
                      secureTextEntry
                      onChangeText={this.onCodeChange.bind(this)}
                      value={this.props.code} //input verdi for fullname
                      borderRadius={5}
                    />
                  </View>
                  <View style={{ height: 50 }}>
                    <ButtonWhite onPress={this.onButtonPress.bind(this)} >
                      Continue
                    </ButtonWhite>
                  </View>
                </View>
                <TouchableOpacity
                    onPress={() => Actions.pop()}
                    style={{ alignItems: 'flex-start', paddingBottom: 5, paddingTop: 5, marginBottom: 5 }}
                >
                  <Text style={{ color: '#ffffff' }}>
                      Back to homescreen
                  </Text>
                </TouchableOpacity>
                  </View>
                </View>


          </KeyboardAvoidingView>
        </Modal>

    </View>
    );
  }
}
/* eslint-enable global-require */


const styles = {
  wrapper: {
  },
  slideWelcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
    paddingLeft: 50,
    paddingRight: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingTop: 50,
    borderRadius: 5
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
    paddingLeft: 50,
    paddingRight: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 5
  },
  slide2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'bebasNeue'
  },
  textOrange: {
    color: '#254552',
    fontSize: 40,
    fontFamily: 'bebasNeue'
  },
  wholeScreen: {
    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.5)', //gived tansparent!


  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'contain'
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#254552',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#95CAFE',
  },
};


const mapStateToProps = state => {

  const { code } = state.lock;

  return { code };
};

export default connect(mapStateToProps,
  { addCode, codeChanged })(lock);
