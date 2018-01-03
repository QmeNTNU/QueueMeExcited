import _ from 'lodash';
import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Modal, Text, View, Dimensions, TouchableOpacity, Image, Linking } from 'react-native';
import { fetchQueue, searchChanged, getWidth, getHeight, fetchAddSubjectQueue } from '../actions';

class InqueueModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '',
      width: ''
    };
  }

  componentWillMount() {
    //retireves dimension of screen to make sure views fits
    const { height, width } = Dimensions.get('window');
    this.setState({ height, width });
    //
  }

  onExitPress() { //closes modal on exit press
    Actions.pop();
  }

  onMazeMapPress() {
  //mazemaps url
  const mazemaps = 'https://use.mazemap.com/#v=1&left=-60.0549508&right=156.3247269&top=70.6742116&bottom=-36.8589261&search=';
  //adds room string to end of url
  const { room } = this.props;
  const url = mazemaps + room;
  //
  //opens the url in safari
  Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  renderName() {
    //if name is to long, we want to display firstname initial and lastname
    if (this.props.studass.length > 16) { //display shortened text
      return (
        <Text style={styles.textStyleSmall}>{this.props.studass}</Text>
      );
    }
    return ( //display normal name
      <Text style={styles.textStyleBig}>{this.props.studass}</Text>
    );
  }

  renderArrowDownImage() {
    /* eslint-disable global-require */
    return (
      <Image
      style={styles.imageStyle}
      source={require('./images/arrowdownblue.png')}
      />
    );
  /* eslint-enable global-require */
  }

  render() {
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent
          onRequestClose={() => { console.log('MODAL CLOSED'); }}
        >
          <View style={styles.wholeScreen}>

            <View style={styles.container}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: this.state.width - 100, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>

                <View style={{ flex: 1, height: 70, alignItems: 'flex-start', justifyContent: 'center' }}>

                </View>
                <View style={{ flex: 1, height: 70, alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                  style={{ height: 70, width: 70 }}
                  source={require('./images/infobutton.png')}
                  />
                </View>
                <TouchableOpacity onPress={this.onExitPress.bind(this)} style={{ flex: 1, height: 70, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                  <Image
                  style={{ height: 30, width: 30 }}
                  source={require('./images/exit.png')}
                  />
                </TouchableOpacity>

              </View>

                <View style={{ flex: 4, backgroundColor: '#213140', borderRadius: 5, width: this.state.width - 100 }}>

                  <View style={{ height: 10, alignItems: 'center' }}>
                    {this.renderArrowDownImage()}
                  </View>

                  <View style={styles.ContainerView}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#ffffff', marginTop: 10 }}>

                      {this.renderName()}
                    </View>

                    <View style={styles.infoView}>
                      <Text style={styles.textStyle2}>People in line: </Text>
                      <Text style={styles.textStyle}>{this.props.studasscount}</Text>
                    </View>


                    <View style={styles.infoView}>
                      <Text style={styles.textStyle2}>Subject: </Text>
                      <Text style={styles.textStyle}>{this.props.subject}</Text>
                    </View>


                    <View style={styles.infoView}>
                      <Text style={styles.textStyle2}>Available until: </Text>
                      <Text style={styles.textStyle}>{this.props.available}</Text>
                    </View>

                    <View style={styles.infoView}>
                      <Text style={styles.textStyle2}>Room: </Text>
                      <Text style={styles.textStyle}>{this.props.room}</Text>
                    </View>

                    <TouchableOpacity onPress={this.onMazeMapPress.bind(this)} style={styles.MazeMapsView}>
                      <Text style={{ color: '#fff', fontFamily: 'bebasNeue' }}>
                        Open in mazemap
                      </Text>
                    </TouchableOpacity>

                  </View>
                </View>

            </View>

          </View>
        </Modal>

    </View>
    );
  }
}


const styles = {
  wrapper: {
  },

  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textOrange: {
    fontSize: 30,
    color: '#213140',
    fontFamily: 'bebasNeue'
  },
  wholeScreen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 100,
    paddingBottom: 100,

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 10,
    height: 250,

  },
  imageStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
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
  ContainerView: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,

  },
  infoView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  MazeMapsView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F58C6C',
    height: 25,
    borderRadius: 5,
  },
  textStyle: {
    color: '#ffffff',
    fontSize: 25,
    fontFamily: 'bebasNeue'
  },
  textStyle2: {
    color: '#F58C6C',
    fontFamily: 'bebasNeue',
    fontSize: 25,

  },
  textStyleBig: {
    color: '#ffffff',
    fontFamily: 'bebasNeue',
    fontSize: 30,

  },
  textStyleSmall: {
    color: '#ffffff',
    fontFamily: 'bebasNeue',
    fontSize: 22,

  },
};
//////   backgroundColor: 'rgba(0, 0, 0, 0.5)', gived tansparent!

const mapStateToProps = state => {
  const { subject, studass, available, room } = state.queueInfo;
  const { studasscount } = state.count;

  return { subject, studass, available, room, studasscount };
};

export default connect(mapStateToProps, { fetchQueue, searchChanged, getHeight, getWidth, fetchAddSubjectQueue })(InqueueModal);
