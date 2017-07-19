import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Text, View, Dimensions } from 'react-native';
import { Button } from './common';
import { addSubject } from '../actions';


class ListItem extends Component {


  /* eslint-disable global-require */


  onAddPress() {
    const { emnekode, emnenavn } = this.props.subject;
    const { ref } = firebase.database().ref('Subject');
    this.props.addSubject({ ref, emnekode, emnenavn });
    this.setModalInvisible();
  }

  setModalInvisible() {
    this.setState({ modalVisible: false });
  }

  checkIfAdded() {
  /*  for (i = 0; i < this.props.queue.length; i++) {
      if (emnekode === 1) {
        return true;
      }
    }
    return false;

*/
}

renderImage() {
  return (
    <Button onPress={this.onAddPress.bind(this)}>
      ADD
    </Button>
  );
}

renderRow() {
  const { emnekode, emnenavn } = this.props.subject;

    return (
      <View style={styles.columnStyle}>

        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{emnenavn}</Text>
          <Text>{emnekode}</Text>
        </View>
        <View style={styles.thumbnailContainerStyle}>
          {this.renderImage()}
        </View>

    </View>
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

  thumbnailContainerStyle: {
    flex: 2,
    justifyContent: 'space-between',
    padding: 5,
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  headerContentStyle: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
};
const mapStateToProps = state => {
  //fungerer ikke å kalle på denne. vet ikke hvorfor
  //MARIUS MÅ UANSETT HENTE UT AVORITTFAG I EN REDUCERSÅ KAN JO BARE BRUKE DE!!!
  const favoriteStudentSubjectList = _.map(state.favoriteStudentSubjectList, (val, uid) => {
    return { ...val, uid };
  });
  return { favoriteStudentSubjectList };
};

export default connect(mapStateToProps, { addSubject })(ListItem);
