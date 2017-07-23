import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { ButtonBlue, Spinner } from './common';
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
  const { myName } = this.props;
  //makes ref from where we want to retrieve data
  const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
  //add user to queue and saves the push location to state
  //this location is used in next scene (in quit queue)
  this.props.addToQueue({ ref, myName });
}

renderImage() {
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  return (
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
    source={require('./images/signqueue.png')}
    />
  );
/* eslint-enable global-require */
}

renderView() {
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  return (
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
    source={require('./images/arrowdown.png')}
    />
  );
/* eslint-enable global-require */
}

renderClockImage() {
  /* eslint-disable global-require */
  return (
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
    source={require('./images/alarm3.png')}
    />
  );
/* eslint-enable global-require */
}

renderButtonBlue() {
  if (this.props.loading) {
    return <Spinner size="large" />;
  }
  return (
    <ButtonBlue onPress={this.onButtonBluePress.bind(this)}>
      ADD TO QUEUE
    </ButtonBlue>
  );
}

  render() {
    return (
    <View style={styles.wholeScreen}>
      <View style={styles.imageView}>
        {this.renderImage()}
      </View>

      <View style={{ flex: 3, borderRadius: 5, backgroundColor: '#495261', marginLeft: 20, marginRight: 20, justifyContent: 'space-between' }} >
      <View style={styles.arrowdown}>
          {this.renderView()}
      </View>

      <View style={styles.ContainerView}>

        <View style={styles.infoView}>
          <View style={{ flex: 1 }}>
            {this.renderClockImage()}
          </View>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textStyle2}>Subject</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textStyle}>{this.props.subject}</Text>
          </View>
        </View>

        <View style={styles.infoView}>
          <View style={{ flex: 1 }}>
            {this.renderClockImage()}
          </View>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textStyle2}>Student Assistent</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.textStyle}>{this.props.studass}</Text>
          </View>
        </View>

        <View style={styles.infoView}>
          <View style={{ flex: 1 }}>
            {this.renderClockImage()}
          </View>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textStyle2}>People in line</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.textStyle}>{this.props.studasscount}</Text>
          </View>
        </View>

        <View style={styles.infoView}>
          <View style={{ flex: 1 }}>
            {this.renderClockImage()}
          </View>
          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textStyle2}>Available until</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.textStyle}>{this.props.available} Oclock </Text>
          </View>

        </View>

      </View>
    </View>


      <View style={styles.ButtonBlueView}>
        {this.renderButtonBlue()}
      </View>


    </View>
    );
  }
}

const styles = {
  wholeScreen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff'
    },
  imageView: {
    flex: 2,
  },
  arrowdown: {
  flex: 1,
  height: 10,
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  marginLeft: 20,
  marginRight: 20


  },
  ContainerView: {
    flex: 9,
    flexDirection: 'column',
    alignItems: 'center',

  },
  infoView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5
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
    fontSize: 25
  },
  textStyle2: {
    color: '#F58C6C',
    fontSize: 25,
    fontFamily: 'bebasNeue'

  }
};

const mapStateToProps = (state) => {
  //retireves info to display
  const { subject, studass, available, studassLocation } = state.queueInfo;
  const { studasscount } = state.count;
  const { myName } = state.nameRed;
  const { loading } = state.loading;//to know when to show spinner

  return { subject, studass, available, studasscount, studassLocation, myName, loading };
};

export default connect(mapStateToProps, { setInfo, getCount, addToQueue })(QueueInfo);
