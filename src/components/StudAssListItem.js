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
  <TouchableHighlight style={{ height: 100, width: 75, padding: 20, backgroundColor: 'yellow' }}>
    <Text style={{ color: 'ffffff' }} STAR />
  </TouchableHighlight>
];

class SubjectAssListItem extends Component {


  /* eslint-disable global-require */


  onAddPress() {
    //const { emnekode, emnenavn } = this.props.subject;
    console.log('PRESSED');
    Actions.info({ person: this.props.studass });
  }

  /* eslint-disable global-require */

renderImage() {
  return (
    <Image
      style={styles.imageStyle}
      source={require('./images/choosepersonstud.png')}
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
  const { emnekode, emnenavn } = this.props.studass;

    return (
        <Swipeable rightButtons={rightButtons}>
      <TouchableWithoutFeedback onPress={this.onAddPress.bind(this)}>

      <View style={styles.columnStyle}>

        <View style={styles.thumbnailContainerStyle}>
          {this.renderImage()}
        </View>


        <View style={styles.headerContentStyle}>
          <View style={{ flex: 2, alignSelf: 'flex-start', justifyContent: 'flex-end' }}>
            <Text style={styles.headerTextStyle}>{emnenavn}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', borderTopWidth: 0.5 }}>
          <Text>{emnekode}</Text>
          <Text> Available until: 13.00 </Text>
        </View>
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
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderTopWidth: 0.5,
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
    fontSize: 30
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

export default connect(mapStateToProps, { addSubject })(SubjectAssListItem);
