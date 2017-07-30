import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { ButtonWhite, Spinner } from './common';
import { setInfo, getCount, addToQueue } from '../actions';

class QueueInfo extends Component {
componentWillMount() {
  //makes ref from where we want to retrieve data
const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
//starts the listener for
this.props.getCount(ref);
}


onButtonBluePress() {
  //gets user name from props (value is retireved and sat to reducer in home-scene)
  const { myName, myGender } = this.props;
  //makes ref from where we want to retrieve data
  const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
  //add user to queue and saves the push location to state
  //this location is used in next scene (in quit queue)
  this.props.addToQueue({ ref, myName, myGender });
}

renderImage() {
  //eslint comments lets us retrieve image!!!
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
  //eslint comments lets us retrieve image!!!
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
  if (this.props.loading) {
    return <Spinner size="large" />;
  }
  return (
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
        Yoou are about to enter a queue:
        </Text>
      </View>


      <View style={{ flex: 2, backgroundColor: '#213140', borderRadius: 5, marginTop: 40, marginLeft: 40, marginRight: 40 }}>

        <View style={{ height: 10, alignItems: 'center' }}>
          {this.renderArrowDownImage()}
        </View>

        <View style={styles.ContainerView}>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#ffffff', marginTop: 10 }}>

            <Text style={styles.textStyleBig}>{this.props.studass}</Text>
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
};

const mapStateToProps = (state) => {
  //retireves info to display
  const { subject, studass, available, studassLocation, room } = state.queueInfo;
  const { studasscount } = state.count;
  const { myName, myGender } = state.nameRed;
  const { loading } = state.loading;//to know when to show spinner

  return { subject, studass, available, studasscount, studassLocation, myName, loading, myGender, room };
};

export default connect(mapStateToProps, { setInfo, getCount, addToQueue })(QueueInfo);
