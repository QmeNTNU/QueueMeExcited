import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { ListView, View, Text, Image } from 'react-native';
import { ButtonBlue, Spinner } from './common';
import { studAssListFetch } from '../actions';
import StudAssListItem from './StudAssListItem';

/*
Kort oppsumert
Som student: henter liste over favorittfag fra firebase og viser som en liste med ListView
*/


class StudAssList extends Component {


  componentWillMount() {
    const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/`);
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

  renderEmptyImage() {
    //eslint comments lets us retrieve image!!!
    /* eslint-disable global-require */
    return (
      <Image
      style={styles.imageStyle}
      source={require('./images/nostudass2.png')}
      />
    );
  /* eslint-enable global-require */
  }

  renderScreen() {
    //shows either a spinner while loading or hte listview when the date is retireved
    if (this.props.loading) {
    return <Spinner size="large" />;
  }
  if (!this.props.studAssList.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: 100 }}>
          {this.renderEmptyImage()}
        </View>
        <Text>
          No available studasses...
        </Text>
      </View>
    );
  }
  return (
    <ListView
      enableEmptySections
      dataSource={this.dataSource3}
      renderRow={this.renderRow}
    />
  );
  }

  render() {
    return (
      <View style={styles.wholeScreen}>
        <View style={styles.ViewBlue}>
          <Text>
          *All available studant assistant in this subject
          </Text>
        </View>
        <View style={{ flex: 8 }}>
          {this.renderScreen()}
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
  const { subject } = state.queueInfo; //to know where to fetch data from
  const { loading } = state.loading; //to know when to show spinner
  return { studAssList, subject, loading };
};

export default connect(mapStateToProps, {
  studAssListFetch })(StudAssList);
