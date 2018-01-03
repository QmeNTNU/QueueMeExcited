import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { ListView, View, Text, Image, Animated } from 'react-native';
import { ButtonBlue, Spinner } from './common';
import { studAssListFetch } from '../actions';
import StudAssListItem from './StudAssListItem';

/*
Kort oppsumert
Som student: henter liste over favorittfag fra firebase og viser som en liste med ListView
*/


class StudAssList extends Component {
  state = { scale: new Animated.Value(1) };


  componentWillMount() {
    //calls action (StudAssListActions.js) to fetch studasses in chosen subject
    const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/`);
    this.props.studAssListFetch({ ref });
    //


    this.createDataSource(this.props); //calls function below to create ListView items.
    //Creates listview items
    const dS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource3 = dS.cloneWithRows(this.props.studAssList);
    //
  }

  componentWillReceiveProps(nextProps) { //called in case the list was not retireved in componentWillMount()
    this.createDataSource(nextProps); //calls function below to create listwie items
  }

  createDataSource({ studAssList }) { //function to clone favoriteStudentSubjectList to a listview
    //standard code for ListView
    const dS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource3 = dS.cloneWithRows(studAssList);
    //
    this.AnimatedPulse();
  }

  AnimatedPulse() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.scale, {
          toValue: 0.95,
          duration: 1500,
        }),
        Animated.timing(this.state.scale, {
          toValue: 1,
          duration: 1500
        })
      ])

    ).start();
  }

  renderRow(studass) {
    return <StudAssListItem studass={studass} />; //calls StudassListItem.js to render rows
  }

  renderEmptyImage() {
    /* eslint-disable global-require */
    return (
      <Animated.Image
      style={[styles.imageStyle, {
             transform: [
               { scaleY: this.state.scale },
               { scaleX: this.state.scale },

             ]
           }]}
      source={require('./images/nostudass3.png')}
      />
    );
    /* eslint-enable global-require */
  }

  renderScreen() {
    //shows either a spinner while loading or hte listview when the date is retireved
    if (this.props.loading) {
    return <Spinner size="large" />;
  }
  if (!this.props.studAssList.length) { //no longer loading, but no studasses retrieved
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: 100 }}>
          {this.renderEmptyImage()}
        </View>
        <Text style={{ color: '#213140', fontFamily: 'bebasNeue' }}>
          No available studasses...
        </Text>
      </View>
    );
  }
  return ( //no longer loading, and subject retireved
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
        <Text style={{ alignSelf: 'center', fontFamily: 'bebasNeue', color: '#213140', fontSize: 30 }}>
          available studasses
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
    height: 40,
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
  const { subject } = state.queueInfo; //to know where to fetch data from
  const { loading } = state.loading; //to know when to show spinner
  return { studAssList, subject, loading };
};

export default connect(mapStateToProps, {
  studAssListFetch })(StudAssList);
