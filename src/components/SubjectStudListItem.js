import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Swipeable from 'react-native-swipeable';
import { Text, View, Image, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { setInfo } from '../actions';

/* eslint-disable global-require */
const rightButtons = [
  <TouchableHighlight style={{ height: 80, width: 75, padding: 20, backgroundColor: 'red' }}>
    <Image
      style={{ height: 20, width: 20, alignSelf: 'center' }}
      source={require('./images/delete.png')}
    />
  </TouchableHighlight>
];

class SubjectStudListItem extends Component {

  onAddPress() {
    //wirtes subject to reducer for later scenes
    this.props.setInfo({ prop: 'subject', value: this.props.subject.emnekode });
    //moves to studasslist
    Actions.studAssList();
  }

  /* eslint-disable global-require */

renderImage() {
  return (
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={require('./images/abook.png')}
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
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderTopWidth: 0.5,
  },

  thumbnailContainerStyle: {
    flex: 2,
    justifyContent: 'space-between',
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
    fontSize: 18
  },
};
/*const mapStateToProps = state => {
  //retireves favorite subject as a student
  const favorites = _.map(state.addSubjectFetch, (val, uid) => {
    return { ...val, uid };
  });

  return { favorites };
};*/

export default connect(null, { setInfo })(SubjectStudListItem);
