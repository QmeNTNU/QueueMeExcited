import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { studAss_update, studAssListFetch } from '../actions';
import StudAssListItem from './StudAssListItem';

/*
Oppsummert hva som skjer
Liste over tilgjengelige studasser som vises, når man klikker seg videre på et fag
fra FavoriteStudentSubjectList.
*/

class StudAssList extends Component {

  componentWillMount(){
    this.props.studAssListFetch();
      this.createDataSource(this.props);
        const DS = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
          this.dataSource1 = DS.cloneWithRows(this.props.studAssList);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ studAssList }) {
    const DS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource1 = DS.cloneWithRows(studAssList);
  }

  renderRow(assistant) {
    return <StudAssListItem assistant={assistant} />;
  }


  render() {

    return (
      <Card>
        <Text> All available student assistants </Text>
        <ListView
          enableEmptySections
          dataSource={this.dataSource1}
          renderRow={this.renderRow}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const studAssList = _.map(state.studAssList, (val, uid) => {
    return { ...val, uid };
  });
  return { studAssList };
};

export default connect(mapStateToProps, {
  studAssListFetch, studAss_update })(StudAssList);
