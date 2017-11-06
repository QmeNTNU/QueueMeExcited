import React, { Component, } from 'react';
import { Actions } from 'react-native-router-flux';
import { Modal, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import SwipeALot from 'react-native-swipe-a-lot'
import { Button } from './common';


class modal extends Component {

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
            <SwipeALot  height={this.state.height - 80} circleDefaultStyle ={styles.InactiveDot} circleActiveStyle={styles.activeDot} >
<View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>
                <View style={styles.slideWelcome}>
                <Image
                  style={styles.imageStyle}
                  source={require('./images/opening.png')}
                />
                  <View style={styles.slide3}>
                  <Text style={styles.textOrange}>WELCOME</Text>
                  <Text style={styles.text}>Stay tuned for a quick walkthrough</Text>
                  </View>
                </View>
              </View>


  <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>

                <View style={styles.slide1}>
                <Text style={styles.textOrange}>STUDASS:</Text>
                  <View style={styles.slide2}>
                  <Image
                    style={styles.imageStyle}
                    source={require('./images/welcomeslide3iphone.png')}
                  />
                    <Text style={styles.text}>Choose subject</Text>
                  </View>
                  <View style={styles.slide2}>
                  <Image
                    style={styles.imageStyle}
                    source={require('./images/welcomeslide2iphone.png')}
                  />
                    <Text style={styles.text}>Create a queue</Text>
                  </View>
                  <View style={styles.slide2}>
                  <Image
                    style={styles.imageStyle}
                    source={require('./images/welcomeslide1iphone.png')}
                  />
                    <Text style={styles.text}>Wait for students</Text>
                  </View>
                </View>
      </View>


      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>

                  <View style={styles.slide1}>
                  <Text style={styles.textOrange}>Student:</Text>
                    <View style={styles.slide2}>
                    <Image
                      style={styles.imageStyle}
                      source={require('./images/welcomeslide3iphone.png')}
                    />
                      <Text style={styles.text}>Choose subject</Text>
                    </View>
                    <View style={styles.slide2}>
                    <Image
                      style={styles.imageStyle}
                      source={require('./images/welcomeslide4iphone.png')}
                    />
                      <Text style={styles.text}>Choose a studass</Text>
                    </View>
                    <View style={styles.slide2}>
                    <Image
                      style={styles.imageStyle}
                      source={require('./images/welcomeslide5iphone.png')}
                    />
                      <Text style={styles.text}>Get in line</Text>
                    </View>
                  </View>
      </View>
      <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>

                  <View style={styles.slide1}>

                      <Text style={styles.textOrange}>That is it!</Text>
                      <View style={{ height: 50, width: 200, borderRadius: 10 }}>
                        <Button onPress={() => Actions.pop()}>
                        Get started
                        </Button>
                      </View>

                  </View>
      </View>

            </SwipeALot>
        </Modal>

    </View>
    );
  }
}
/* eslint-enable global-require */


const styles = {
  wrapper: {
  },
  activeDot:{
    backgroundColor: '#254552',
  },
  InactiveDot:{
     width: 10,
     height: 10,
     margin: 10,
     backgroundColor: '#ffffff',
     borderRadius: 5
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', //gived tansparent!
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,

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


/*
const mapStateToProps = ({ auth }) => {

};

export default connect(mapStateToProps, {  })(modal);
*/
export default modal;
