import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Swipeable from 'react-native-swipeable';
import { Text, View, Image, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { setInfo } from '../actions';

/* eslint-disable global-require */
const rightButtons = [
  <TouchableHighlight style={{ flex: 1, width: 75, backgroundColor: 'yellow', padding: 30 }}>
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={require('./images/delete.png')}
    />
  </TouchableHighlight>
];

class SubjectAssListItem extends Component {


  /* eslint-disable global-require */


  onAddPress() {
    //sets info to queueInfo-reducer to show in next screen
    this.props.setInfo({ prop: 'studass', value: this.props.studass.fullname });
    this.props.setInfo({ prop: 'available', value: this.props.studass.available });
    this.props.setInfo({ prop: 'studassLocation', value: this.props.studass.userUID });
    //goes to next scene
    Actions.queueInfo();
  }

  /* eslint-disable global-require */

renderImage() {
  return (
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={require('./images/choosepersonstud.png')}
    />
  );
}

renderArrowImage() {
  return (
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={require('./images/arrow_blue.png')}
    />
  );
}

  /* eslint-enable global-require */

renderRow() {
  const { fullname, available } = this.props.studass;

    return (
        <Swipeable rightButtons={rightButtons}>
      <TouchableWithoutFeedback onPress={this.onAddPress.bind(this)}>

      <View style={styles.columnStyle}>

        <View style={styles.thumbnailContainerStyle}>
          {this.renderImage()}
        </View>


        <View style={styles.headerContentStyle}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text style={{ color: '#ffffff' }}> Available until: {available} </Text>
          </View>
          <View style={{ flex: 1, alignSelf: 'flex-start', justifyContent: 'flex-end' }}>
            <Text style={styles.headerTextStyle}>{fullname}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text> Available until: {available} </Text>
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
  },

  thumbnailContainerStyle: {
    flex: 2,
    padding: 10,
  },
  arrowStyle: {
    flex: 1,
    padding: 10
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
    fontSize: 40,
    fontFamily: 'bebasNeue'
  },
};
/*const mapStateToProps = state => {
  const favorites = _.map(state.addSubjectFetch, (val, uid) => {
    return { ...val, uid };
  });
  return { favorites };
};*/

export default connect(null, { setInfo })(SubjectAssListItem);
