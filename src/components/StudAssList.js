import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { ListView, View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { studAssListFetch } from '../actions';
import StudAssListItem from './StudAssListItem';

/*
Kort oppsumert
Som student: henter liste over favorittfag fra firebase og viser som en liste med ListView
*/


class StudAssList extends Component {


  componentWillMount() {
    const { ref } = firebase.database().ref('Subject');
    this.props.studAssListFetch({ ref });
    //sets listview
    this.createDataSource(this.props);
    const dS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource3 = dS.cloneWithRows(this.props.studAssList);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ studAssList }) {
    const dS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource3 = dS.cloneWithRows(studAssList);
  }

  renderRow(studass) {
    return <StudAssListItem studass={studass} />;
  }

  render() {
    return (
      <View style={styles.wholeScreen}>
        <View style={styles.ViewOrange}>
          <Text>
          All your subjects
          </Text>
        </View>
        <View style={{ flex: 8 }}>
          <ListView
            enableEmptySections
            dataSource={this.dataSource3}
            renderRow={this.renderRow}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Button
            onPress={() => Actions.addSubjectFormAss()}
          >
            Add your subjects
          </Button>
        </View>
      </View>
    );
  }
}
const styles = {
  text: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  ViewOrange: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F58C6C'
  },
  wholeScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
    borderRadius: 10,
    shadowRadius: 5,
      elevation: 2,
  },
  imageStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#254552',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#95CAFE',
  },
};


const mapStateToProps = state => {
  const studAssList = _.map(state.studAssList, (val, uid) => {
    return { ...val, uid };
  });
  return { studAssList };
};

export default connect(mapStateToProps, {
  studAssListFetch })(StudAssList);
