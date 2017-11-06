import React, { Component, } from 'react';
import { Actions } from 'react-native-router-flux';
import { Modal, Text, View, Image, Dimensions, TouchableOpacity, Platform } from 'react-native';
import SwipeALot from 'react-native-swipe-a-lot';
import Swiper from 'react-native-swiper';
import { Button } from './common';


class aboutUs extends Component {

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
  renderScreen() {
      if (Platform.OS === 'android') {
        return (

            <Modal
              animationType={'slide'}
              transparent
              visible={this.state.modalVisible}
              onRequestClose={() => { console.log('MODAL CLOSED'); }}
            >
              <SwipeALot  height={this.state.height - 80} circleDefaultStyle ={styles.InactiveDot} circleActiveStyle={styles.activeDot} >
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>
                    <View style={styles.slideWelcome}>
                      <View style={styles.slide3}>
                        <View style={{ height: 200 }} />

                      <Text style={styles.textOrange}>About us</Text>
                      <Text style={styles.text}>QueueMe is created in collaboration with the Exited project by Anders By Kampenes, Joakim Hegg Johansen, Marius Alexander Løken and Magnus Knædal</Text>
                      </View>
                    </View>
        </View>

    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>
                    <View style={styles.slideWelcome}>
                      <View style={styles.slide3}>
                      <Text style={styles.textOrange}>TEAM MEMBERS:</Text>
                      </View>
                      <View style={styles.slide3}>
                      <Text style={styles.textOrange2}>Anders Kampenes</Text>
                      <Text style={styles.text}>NTNU, I&IKT </Text>
                      </View>
                      <View style={styles.slide3}>
                      <Text style={styles.textOrange2}>Joakim Johansen</Text>
                      <Text style={styles.text}>NTNU, I&IKT </Text>

                      </View>
                      <View style={styles.slide3}>
                      <Text style={styles.textOrange2}>Marius Løken</Text>
                      <Text style={styles.text}>NTNU, I&IKT </Text>
                      </View>

                    <View style={styles.slide3}>
                    <Text style={styles.textOrange2}>Magnus Knædal</Text>
                    <Text style={styles.text}>NTNU, I&IKT </Text>
                    </View>
                    </View>
        </View>

    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1}}>
                    <View style={styles.slide1}>


                        <View style={{ height: 50, width: 200, borderRadius: 10 }}>
                          <Button onPress={() => Actions.pop()}>
                          Back to settings
                          </Button>
                        </View>

                    </View>
        </View>

                </SwipeALot>
            </Modal>


        );
      } else if (Platform.OS === 'ios') {
        return (

       <Modal
         animationType={'slide'}
         transparent
         visible={this.state.modalVisible}
         onRequestClose={() => { console.log('MODAL CLOSED'); }}
       >
         <View style={styles.wholeScreen}>
           <Swiper style={styles.wrapper} height={this.state.height - 80} loop={false} activeDotColor='#254552' dotColor='#ffffff'>

               <View style={styles.slideWelcome}>
                 <View style={styles.slide3}>
                   <View style={{ height: 200 }} />

                 <Text style={styles.textOrange}>About us</Text>
                 <Text style={styles.text}>QueueMe is created in collaboration with the Exited project by Anders By Kampenes, Joakim Hegg Johansen, Marius Alexander Løken and Magnus Knædal</Text>
                 </View>
               </View>


               <View style={styles.slideWelcome}>
                 <View style={styles.slide3}>
                 <Text style={styles.textOrange}>TEAM MEMBERS:</Text>
                 </View>
                 <View style={styles.slide3}>
                 <Text style={styles.textOrange2}>Anders Kampenes</Text>
                 <Text style={styles.text}>NTNU, I&IKT </Text>
                 </View>
                 <View style={styles.slide3}>
                 <Text style={styles.textOrange2}>Joakim Johansen</Text>
                 <Text style={styles.text}>NTNU, I&IKT </Text>

                 </View>
                 <View style={styles.slide3}>
                 <Text style={styles.textOrange2}>Marius Løken</Text>
                 <Text style={styles.text}>NTNU, I&IKT </Text>
                 </View>

               <View style={styles.slide3}>
               <Text style={styles.textOrange2}>Magnus Knædal</Text>
               <Text style={styles.text}>NTNU, I&IKT </Text>
               </View>
               </View>

               <View style={styles.slide1}>


                   <View style={{ height: 50, width: 200, borderRadius: 10 }}>
                     <Button onPress={() => Actions.pop()}>
                     Back to settings
                     </Button>
                   </View>

               </View>

           </Swiper>
         </View>
       </Modal>

   );
      }
  }

  /* eslint-disable global-require */
  render() {
    return (
      <View>
        {this.renderScreen()}

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
    paddingLeft: 40,
    paddingRight: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingTop: 50,
    paddingBottom: 10,
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
    marginBottom: 10
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'bebasNeue'
  },
  textOrange: {
    color: '#254552',
    fontSize: 35,
    fontFamily: 'bebasNeue'
  },
  textOrange2: {
    color: '#ffffff',
    fontSize: 30,
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
export default aboutUs;
