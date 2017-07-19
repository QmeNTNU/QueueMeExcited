import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ListView, View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { favoriteAssSubjectListFetch } from '../actions';
import SubjectAssListItem from './SubjectStudListItem';

/*
Kort oppsumert
Som student: henter liste over favorittfag fra firebase og viser som en liste med ListView
*/


class FavoriteAssSubjectList extends Component {


  componentWillMount() {
    this.props.favoriteAssSubjectListFetch();
    this.createDataSource(this.props);
    const dS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource3 = dS.cloneWithRows(this.props.favoriteStudentSubjectList);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ favoriteStudentSubjectList }) {
    const dS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource3 = dS.cloneWithRows(favoriteStudentSubjectList);
  }

  renderRow(subject) {
    return <SubjectAssListItem subject={subject} />;
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
  const favoriteStudentSubjectList = _.map(state.favoriteAssSubjectList, (val, uid) => {
    return { ...val, uid };
  });
  return { favoriteStudentSubjectList };
};

export default connect(mapStateToProps,
  { favoriteAssSubjectListFetch })(FavoriteAssSubjectList);
