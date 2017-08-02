import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Swipeable from 'react-native-swipeable';
import { Text, View, Image, TouchableWithoutFeedback, TouchableHighlight, StyleSheet } from 'react-native';
import { setInfo } from '../actions';

/* eslint-disable global-require */

class SubjectAssListItem extends Component {


  /* eslint-disable global-require */


  onAddPress() {
    //sets info to queueInfo-reducer to show in next screen
    this.props.setInfo({ prop: 'studass', value: this.props.studass.fullname });
    this.props.setInfo({ prop: 'available', value: this.props.studass.available });
    this.props.setInfo({ prop: 'studassLocation', value: this.props.studass.userUID });
    this.props.setInfo({ prop: 'room', value: this.props.studass.room });

    //goes to next scene
    Actions.queueInfo();
  }

  /* eslint-disable global-require */


renderImage() {
  //gets gender to display either girl or boy

  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  const icon = this.props.studass.userGender === 'female' ? require('./images/choosegirlstud2.png') : require('./images/choosepersonstud2.png');
  return (
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={icon}
    />
  );
/* eslint-enable global-require */
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

renderStarImage() {
  return (
    <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={require('./images/starred.png')}
    />
  );
}

renderName() {
  //if name is to long, we want to display firstname initial and lastname
  if (this.props.studass.fullname.length >= 13) {
    const splitArray = this.props.studass.fullname.split(' ');
    const firstname = splitArray[0].charAt(0);
    const lastname = splitArray[1];
    return (
      <Text style={styles.headerTextStyle}>{firstname}. {lastname}</Text>
    );
  }
  return (
    <Text style={styles.headerTextStyle}>{this.props.studass.fullname}</Text>
  );
}

  /* eslint-enable global-require */

renderRow() {
  const { available } = this.props.studass;
  const rightButtons = [
    <TouchableHighlight style={{ flex: 1, width: 75, backgroundColor: '#F58C6C', padding: 20 }}>
      <Image
        style={{ flex: 1, height: undefined, width: undefined }}
        resizeMode="contain"
        source={require('./images/starred.png')}
      />
    </TouchableHighlight>
  ];

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
            {this.renderName()}
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <View style={{ flex: 1 }}>
                <Text> Available until: {available} </Text>
            </View>

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
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  thumbnailContainerStyle: {
    flex: 2,
    justifyContent: 'space-between',
    padding: 1,
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
    fontFamily: 'bebasNeue',
    color: '#213140'
  },
};
/*const mapStateToProps = state => {
  const favorites = _.map(state.addSubjectFetch, (val, uid) => {
    return { ...val, uid };
  });
  return { favorites };
};*/

export default connect(null, { setInfo })(SubjectAssListItem);
