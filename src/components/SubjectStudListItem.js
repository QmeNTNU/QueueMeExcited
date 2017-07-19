import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Swipeable from 'react-native-swipeable';
import { Text, View, Image, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { Button, Spinner } from './common';
import { addSubject } from '../actions';
/* eslint-disable global-require */

const rightButtons = [
  <TouchableHighlight style={{ height: 60, width: 75, padding: 20, backgroundColor: 'red' }}>
    <Image
      style={{ height: 20, width: 20, alignSelf: 'center' }}
      source={require('./images/delete.png')}
    />
  </TouchableHighlight>
];

class SubjectStudListItem extends Component {

  onAddPress() {
    //const { emnekode, emnenavn } = this.props.subject;
    console.log('PRESSED');
    Actions.createQueue({ subject: this.props.subject });
  }


renderImage() {
  return (
    <Image
      style={styles.imageStyle}
      source={require('./images/alarm3.png')}
    />
  );
}

renderArrowImage() {
  return (
    <Image
      style={styles.imageStyle}
      source={require('./images/arrow_blue.png')}
    />
  );
}

  /* eslint-enable global-require */

renderRow() {
  const { emnekode, emnenavn } = this.props.subject;

    return (
      <Swipeable rightButtons={rightButtons}>
      <TouchableWithoutFeedback onPress={this.onAddPress.bind(this)}>

      <View style={styles.columnStyle}>

        <View style={styles.thumbnailContainerStyle}>
          {this.renderImage()}
        </View>

        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{emnenavn}</Text>
          <Text>{emnekode}</Text>
        </View>

        <View style={styles.arrowStyle}>
          {this.renderArrowImage()}
        </View>


    </View>
  </TouchableWithoutFeedback>
</Swipeable>

    );
}

  render() {
    return (
    this.renderRow()
  );
  }
}
/* eslint-enable global-require */

const styles = {
  columnStyle: {
    flex: 10,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderTopWidth: 0.5,
  },
  ButtonStyle: {
    height: 60,
    backgroundColor: 'red'
  },

  thumbnailContainerStyle: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'space-between',
    padding: 5,
  },
  arrowStyle: {
    height: 40,
    width: 40,
    alignSelf: 'center'
  },
  imageStyle: {
    height: 60,
    width: 60,
    alignSelf: 'center'
  },
  headerContentStyle: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  headerTextStyle: {
    fontSize: 18
  },
};
const mapStateToProps = state => {
  //fungerer ikke å kalle på denne. vet ikke hvorfor
  //MARIUS MÅ UANSETT HENTE UT AVORITTFAG I EN REDUCERSÅ KAN JO BARE BRUKE DE!!!
  const favorites = _.map(state.addSubjectFetch, (val, uid) => {
    return { ...val, uid };
  });

  return { favorites };
};

export default connect(mapStateToProps, { addSubject })(SubjectStudListItem);
