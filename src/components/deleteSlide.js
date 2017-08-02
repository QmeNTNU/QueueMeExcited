import React, { Component, } from 'react';
import { Actions } from 'react-native-router-flux';
import { Modal, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { ButtonWhite } from './common';


class deleteSlide extends Component {

  state = { modalVisible: this.props.visible, height: '', width: '' };

  componentWillMount() {
    //retireves dimension of screen to make sure views fits
    const { height, width } = Dimensions.get('window');
    this.setState({ height, width });
  }

  setModalVisible() {
    this.setState({ modalVisible: true });
  }
  setModalInvisible() {
    this.setState({ modalVisible: false });
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
          <View style={styles.wholeScreen}>
            <View style={styles.slideWelcome} height={this.state.height - 80} width={this.state.width - 80}>
                <Image
                  style={{ flex: 1, resizeMode: 'contain' }}
                  width={this.state.width - 80}
                  source={require('./images/turtorialdelete.png')}
                />

                <Text style={styles.textOrange}>TIP</Text>
                <Text style={styles.text}>Slide to delete subjects</Text>
                <View style={{ height: 60 }} width={this.state.width - 80}>
                  <ButtonWhite onPress={() => Actions.pop()}>
                    Got it
                  </ButtonWhite>
                </View>
            </View>
          </View>
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
    borderRadius: 5,

  },

  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'bebasNeue',
    marginBottom: 20
  },
  textOrange: {
    color: '#254552',
    fontSize: 30,
    fontFamily: 'bebasNeue',
    textAlign: 'center'
  },
  wholeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', //gived tansparent!
    paddingBottom: 60,
  },

  imageStyle: {
    flex: 1,
    width: 200,
    resizeMode: 'contain'
  },

};


/*
const mapStateToProps = ({ auth }) => {

};

export default connect(mapStateToProps, {  })(modal);
*/
export default deleteSlide;
