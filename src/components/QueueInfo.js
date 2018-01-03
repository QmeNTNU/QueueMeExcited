import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { ButtonWhite, Spinner } from './common';
import { setInfo, getCount, addToQueue } from '../actions';

class QueueInfo extends Component {

  componentWillMount() {
    //calls action (CountAction.js) to retireve count in line
    const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
    this.props.getCount(ref);
    //
  }


  onButtonBluePress() {
    //gets user name from props (value is retireved and sat to reducer in home-scene)
    const { myGender, playerId } = this.props;
    //

    // calls action (QueueInfoAction.js) to add user to queue
    const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
    this.props.addToQueue({ ref, myGender, playerId });
    //
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

  renderImage() {
    /* eslint-disable global-require */
    return (
      <Image
      style={styles.imageStyle}
      source={require('./images/choosepersonstud.png')}
      />
    );
    /* eslint-enable global-require */
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

  renderButtonBlue() {
    if (this.props.loadAdd) { //shows spinner while loading
      return <Spinner size="large" />;
    }
    return ( //shows button if not loading
      <ButtonWhite onPress={this.onButtonBluePress.bind(this)}>
        ADD TO QUEUE
      </ButtonWhite>
    );
  }

    render() {
      return (
      <View style={styles.wholeScreen}>
        <View style={styles.ViewBlue}>
          <Text style={{ alignSelf: 'center', fontFamily: 'bebasNeue', color: '#213140', fontSize: 30 }}>
          You're about to enter a queue:
          </Text>
        </View>


        <View style={{ flex: 2, backgroundColor: '#213140', borderRadius: 5, marginTop: 40, marginLeft: 40, marginRight: 40 }}>

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

        <View style={{ height: 60, marginTop: 5, marginLeft: 40, marginRight: 40 }}>
          {this.renderButtonBlue()}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ color: '#95CAFE' }}>
            PLACEHOLDER
          </Text>
        </View>


      </View>
      );
    }
  }

  const styles = {
    wholeScreen: {
      flex: 1,
      flexDirection: 'column',
    },
    ViewBlue: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F58C6C'
    },
    imageView: {
      flex: 5,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageStyle: {
      flex: 1,
      resizeMode: 'contain'

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
    ButtonBlueView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
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

  const mapStateToProps = (state) => {
    const { subject, studass, available, studassLocation, room, playerId, loadAdd } = state.queueInfo;
    const { studasscount } = state.count;
    const { myGender } = state.nameRed;

    return { subject, studass, available, studasscount, studassLocation, loadAdd, myGender, room, playerId };
  };

  export default connect(mapStateToProps, { setInfo, getCount, addToQueue })(QueueInfo);
