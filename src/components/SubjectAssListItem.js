import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Swipeable from 'react-native-swipeable';
import { Text, View, Image, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { studassSubject, deleteSubject } from '../actions';
/* eslint-disable global-require */


class SubjectAssListItem extends Component {

  onAddPress() {
    //wirtes subject to reducer for later scenes
    this.props.studassSubject(this.props.subject.emnekode);
    //moves to nextscene
    Actions.createQueue({ subject: this.props.subject });
  }

  onDeletePress() {
    //retireves uid and emnekode to delete the pressed subject
    const { emnekode } = this.props.subject;
    const userUID = firebase.auth().currentUser.uid;
    //makes a ref for favstudsubject
    const { ref } = firebase.database().ref(`users/${userUID}/favasssubject/${emnekode}`);
    this.props.deleteSubject({ ref });
  }

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
  const rightButtons = [
    <TouchableHighlight onPress={this.onDeletePress.bind(this)} style={{ flex: 1, width: 75, backgroundColor: 'red', padding: 30 }}>
      <Image
        style={{ flex: 1, height: undefined, width: undefined }}
        resizeMode="contain"
        source={require('./images/delete.png')}
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
    fontFamily: 'bebasNeue',
    fontSize: 40,
    color: '#213140'

  },
};
/*const mapStateToProps = state => {
  //fungerer ikke å kalle på denne. vet ikke hvorfor
  //MARIUS MÅ UANSETT HENTE UT AVORITTFAG I EN REDUCERSÅ KAN JO BARE BRUKE DE!!!
  const favorites = _.map(state.addSubjectFetch, (val, uid) => {
    return { ...val, uid };
  });

  return { favorites };
};*/

export default connect(null, { studassSubject, deleteSubject })(SubjectAssListItem);
