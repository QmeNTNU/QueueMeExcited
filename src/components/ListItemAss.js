import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { addSubject } from '../actions';


class ListItemAss extends Component {


  /* eslint-disable global-require */


  onAddPress() {
    const { emnekode, emnenavn } = this.props.subject; //gets subject info

    //calls action (addSubjectAction.js) to add subject to favorite studen subject
    const userUID = firebase.auth().currentUser.uid;
    const { ref } = firebase.database().ref(`users/${userUID}/favasssubject/${emnekode}`);
    this.props.addSubject({ ref, emnekode, emnenavn });
    //
  }


  checkIfAdded() { //only diplays a add-button if it is not already addet to the users favorite subjects
    console.log('favor', this.props.favoriteAssSubjectList);
    const { emnekode } = this.props.subject;
    for (let i = 0; i < this.props.favoriteAssSubjectList.length; i++) {
      if (emnekode === this.props.favoriteAssSubjectList[i].emnekode) {
        return true;
      }
    }
    return false;
}

renderImage() {
  if (this.checkIfAdded()) { //alrady added so do not show add button
  return (

      <Image
      style={{ flex: 1, height: undefined, width: undefined }}
      resizeMode="contain"
      source={require('./images/emptydontadd.png')}
      />

  );
}
return ( //show add button

    <Image
    style={{ flex: 1, height: undefined, width: undefined }}
    resizeMode="contain"
    source={require('./images/add.png')}
    />


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

        <View style={styles.arrowStyle}>
          <TouchableOpacity onPress={this.onAddPress.bind(this)} style={{ flex: 1 }}>
          {this.renderImage()}
        </TouchableOpacity>
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
    padding: 0
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
    fontSize: 30,
    color: '#213140'

  },
};
const mapStateToProps = state => {
  const favoriteAssSubjectList = _.map(state.favoriteAssSubjectList, (val, uid) => {
    return { ...val, uid };
  });
  return { favoriteAssSubjectList };
};

export default connect(mapStateToProps, { addSubject })(ListItemAss);
