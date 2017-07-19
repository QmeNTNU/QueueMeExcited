import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ListView, View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { favoriteStudentSubjectListFetch } from '../actions';
import SubjectStudListItem from './SubjectStudListItem';

/*
Kort oppsumert
Som student: henter liste over favorittfag fra firebase og viser som en liste med ListView
*/


class FavoriteStudentSubjectList extends Component {


  componentWillMount() {
    this.props.favoriteStudentSubjectListFetch();
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

  renderRow(fagStudent) {
    return <SubjectStudListItem fagStudent={fagStudent} />;
  }

  render() {
    return (
      <Card>
        <Text
          style={{
            flex: 0.5,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
        All your subjects
        </Text>
        <ListView
          enableEmptySections
          dataSource={this.dataSource3}
          renderRow={this.renderRow}
        />
        <Button
          onPress={() => Actions.addSubjectFormStudent()}
        >
          Add your subjects
        </Button>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const favoriteStudentSubjectList = _.map(state.favoriteStudentSubjectList, (val, uid) => {
    return { ...val, uid };
  });
  return { favoriteStudentSubjectList };
};

export default connect(mapStateToProps,
  { favoriteStudentSubjectListFetch })(FavoriteStudentSubjectList);
