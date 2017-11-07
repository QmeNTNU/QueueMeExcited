<<<<<<< HEAD
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListView, View, Text, AsyncStorage, Image } from 'react-native';
import { ButtonBlue, Spinner } from './common';
import { favoriteAssSubjectListFetch } from '../actions';
import SubjectAssListItem from './SubjectAssListItem';

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

  componentDidMount() {
    //checks if it should display welcomeslides
    this.checkWelcomeSlides();
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

  ///Asnc storadge functions////////////
  async checkWelcomeSlides() {
   try {
      const value = await AsyncStorage.getItem('displayDeleteSlide');
      if (value === null) {
        //sets displaySlides to NOT so it doesent show welcomeslides again
        this.setWelcomeSlides();
        console.log('COMDIDMOUNT', value);
        // Actions.deleteSlide();
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  async setWelcomeSlides() {
    try {
          await AsyncStorage.setItem('displayDeleteSlide', 'NOT');
        } catch (error) {
          // Error saving data
        }
  }
  //////////////////////////////////
  renderEmptyImage() {
    //eslint comments lets us retrieve image!!!
    /* eslint-disable global-require */
    return (
      <Image
      style={styles.imageStyle}
      source={require('./images/arrowdown_listview.png')}
      />
    );
  /* eslint-enable global-require */
  }

  renderRow(subject) {
    return <SubjectAssListItem subject={subject} />;
  }

  renderScreen() {
    //shows either a spinner while loading or hte listview when the date is retireved
    if (this.props.loading) {
    return <Spinner size="large" />;
  }
  if(!this.props.favoriteStudentSubjectList.length){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#213140', fontFamily: 'bebasNeue' }}>
          You have no added subjcts.
        </Text>
        <Text style={{ color: '#213140', fontFamily: 'bebasNeue' }}>
          Add subjects below. Swipe to delete.
        </Text>
        <View style={{ height: 100 }}>
          {this.renderEmptyImage()}
        </View>
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
          <Text style={{ alignSelf: 'center', fontFamily: 'bebasNeue', color: '#213140', fontSize: 30 }}>
          Your studass subjects
          </Text>
        </View>
        <View style={{ flex: 8 }}>
          {this.renderScreen()}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ButtonBlue
            onPress={() => Actions.addSubjectAss()}
          >
            ADD SUBJECTS
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
  const favoriteStudentSubjectList = _.map(state.favoriteAssSubjectList, (val, uid) => {
    return { ...val, uid };
  });
  const { loading } = state.loading;

  return { favoriteStudentSubjectList, loading };
};

export default connect(mapStateToProps,
  { favoriteAssSubjectListFetch })(FavoriteAssSubjectList);
=======
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListView, View, Text, AsyncStorage, Image } from 'react-native';
import { ButtonBlue, Spinner } from './common';
import { favoriteAssSubjectListFetch } from '../actions';
import SubjectAssListItem from './SubjectAssListItem';

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

  componentDidMount() {
    //checks if it should display welcomeslides
    this.checkWelcomeSlides();
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

  ///Asnc storadge functions////////////
  async checkWelcomeSlides() {
   try {
      const value = await AsyncStorage.getItem('displayDeleteSlide');
      if (value === null) {
        //sets displaySlides to NOT so it doesent show welcomeslides again
        this.setWelcomeSlides();
        console.log('COMDIDMOUNT', value);
        // Actions.deleteSlide();
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  async setWelcomeSlides() {
    try {
          await AsyncStorage.setItem('displayDeleteSlide', 'NOT');
        } catch (error) {
          // Error saving data
        }
  }
  //////////////////////////////////
  renderEmptyImage() {
    //eslint comments lets us retrieve image!!!
    /* eslint-disable global-require */
    return (
      <Image
      style={styles.imageStyle}
      source={require('./images/arrowdown_listview.png')}
      />
    );
  /* eslint-enable global-require */
  }

  renderRow(subject) {
    return <SubjectAssListItem subject={subject} />;
  }

  renderScreen() {
    //shows either a spinner while loading or hte listview when the date is retireved
    if (this.props.loading) {
    return <Spinner size="large" />;
  }
  if(!this.props.favoriteStudentSubjectList.length){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#213140', fontFamily: 'bebasNeue' }}>
          You have no added subjcts.
        </Text>
        <Text style={{ color: '#213140', fontFamily: 'bebasNeue' }}>
          Add subjects below. Swipe to delete.
        </Text>
        <View style={{ height: 100 }}>
          {this.renderEmptyImage()}
        </View>
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
          <Text style={{ alignSelf: 'center', fontFamily: 'bebasNeue', color: '#213140', fontSize: 30 }}>
          Your studass subjects
          </Text>
        </View>
        <View style={{ flex: 8 }}>
          {this.renderScreen()}
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <ButtonBlue
            onPress={() => Actions.addSubjectAss()}
          >
            ADD SUBJECTS
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
  const favoriteStudentSubjectList = _.map(state.favoriteAssSubjectList, (val, uid) => {
    return { ...val, uid };
  });
  const { loading } = state.loading;

  return { favoriteStudentSubjectList, loading };
};

export default connect(mapStateToProps,
  { favoriteAssSubjectListFetch })(FavoriteAssSubjectList);
>>>>>>> 9d15bdfe28ecb088671175fdd98ec9905732c8ca
