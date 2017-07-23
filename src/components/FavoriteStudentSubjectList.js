import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ListView, View, Text } from 'react-native';
import { Card, CardSection, Input, ButtonBlue, Spinner } from './common';
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

  renderRow(subject) {
    return <SubjectStudListItem subject={subject} />;
  }

  renderScreen() {
    //shows either a spinner while loading or hte listview when the date is retireved
    if (this.props.loading) {
    return <Spinner size="large" />;
  }

  return (
    <ListView
      enableEmptySections
      dataSource={this.dataSource3}
      renderRow={this.renderRow}
    />
  );
  }
//Actions.addSubjectStudent({ modalVisible: true })
  render() {
    return (
      <View style={styles.wholeScreen}>
        <View style={styles.ViewBlue}>
          <Text>
          *All your choosen subjects as a student
          </Text>
        </View>
        <View style={{ flex: 8 }}>
          {this.renderScreen()}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ButtonBlue
            onPress={() => console.log('pressed')}
          >
            Add your subjects
          </ButtonBlue>
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
  ViewBlue: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A8D3FE'
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
  ButtonBlueView: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#254552',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#95CAFE',
  },
};

const mapStateToProps = state => {
  const favoriteStudentSubjectList = _.map(state.favoriteStudentSubjectList, (val, uid) => {
    return { ...val, uid };
  });
  const { loading } = state.loading;

  return { favoriteStudentSubjectList, loading };
};

export default connect(mapStateToProps,
  { favoriteStudentSubjectListFetch })(FavoriteStudentSubjectList);
