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

            <View style={styles.container}>
              <View style={styles.slideWelcome}>
                <Image
                  style={styles.imageStyle}
                  source={require('./images/turtorialdelete.png')}
                />

                <Text style={styles.textOrange}>TIP</Text>
                <Text style={styles.text}>Slide to delete subjects</Text>
                <View style={{ marginLeft: 70, marginRight: 70, height: 60 }}>
                  <ButtonWhite onPress={() => Actions.pop()}>
                    Got it
                  </ButtonWhite>
                </View>
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
    backgroundColor: '#95CAFE',
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 20,
    marginTop: 50,

  },

  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'bebasNeue'
  },
  textOrange: {
    color: '#254552',
    fontSize: 30,
    fontFamily: 'bebasNeue',
    textAlign: 'center'
  },
  wholeScreen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', //gived tansparent!

    paddingTop: 80,
    paddingBottom: 80,

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
    borderRadius: 5,
    marginRight: 60,
    marginLeft: 60
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


/*
const mapStateToProps = ({ auth }) => {

};

export default connect(mapStateToProps, {  })(modal);
*/
export default deleteSlide;
