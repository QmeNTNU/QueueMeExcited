import _ from 'lodash';
import React, { Component, } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Modal, Text, View, Image, Dimensions, ListView, TouchableOpacity } from 'react-native';
import { Spinner } from './common';
import ListItemAss from './ListItemAss';
import { fetchQueue, searchChanged, getWidth, getHeight, fetchAddSubjectQueue } from '../actions';

class addSubjectAss extends Component {
  constructor(props) {
    const data = [];//initial data for listview. Not used after this
    //creates items for listView
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    //
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(data),
      modalVisible: this.props.visible,
      height: '',
      width: ''
    };
  }

  componentWillMount() {
    //calls action () to retrieve student subjects
    const { ref } = firebase.database().ref('Subject');
    this.props.fetchQueue({ ref });
    //

    //retireves dimension of screen to make sure views fits
    const { height, width } = Dimensions.get('window');
    this.setState({ height, width });
    //
    this.createDataSource(this.props);//calls function below to create listView
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component will be rendered with
    //calls function below to create listView in case the queue wasnt fetched before
    this.createDataSource(nextProps);
    //
  }

  createDataSource({ subjects }) { //function that creates items for ListView
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
       dataSource: ds.cloneWithRows(subjects),

     });
  }

  renderRow(subject) { //function that renders each item in ListView
    return <ListItemAss subject={subject} />;
  }


  setModalVisible() { //function to make modal visable
    this.setState({ modalVisible: true });
  }
  setModalInvisible() { //function to close modal
    this.setState({ modalVisible: false });
  }

  ////////////////////thoughts of search input////////////////////////////
/*
onSearchChange(text) {
  this.props.searchChanged(text);

  const filteredAssets = this.props.subjects.filter(function (subject) {
    const itemData = subject.emnenavn.toUpperCase();
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
    console.log('filteredAssets', filteredAssets);
    const newArray = this.props.subjects[1];
    const copy = Object.assign({}, newArray);
    console.log('copy', copy);
    const subjectssss = _.map(filteredAssets, (val, uid) => {
      return { ...val, uid };
    });
    console.log('subjectssss', subjectssss);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
       dataSource: this.state.dataSource.cloneWithRows(filteredAssets),
     });
}
*/
/////////////////////////////////////////////////////////////////////

renderScreen() {
  if (!this.props.subjects.length) { //show spinner while loading
    return <Spinner size="large" />;
  }
  return ( //show listview when done
    <ListView
      enableEmptySections
      dataSource={this.state.dataSource}
      renderRow={this.renderRow}
    />
  );
}
  /* eslint-disable global-require */
  render() {
    return (
      <View>
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => { console.log('MODAL CLOSED'); }}
        >
          <View style={styles.wholeScreen}>
            <View style={styles.container}>
              <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', width: this.state.width - 40, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: '#95CAFE' }}>
                <Text style={styles.textOrange}>
                  Add subjects
                </Text>
              </View>

              <View style={{ flex: 7, width: this.state.width - 40, backgroundColor: '#ffffff' }}>
                {this.renderScreen()}
              </View>

              <View style={{ flex: 1, borderTopWidth: 1, alignItems: 'center', justifyContent: 'center', width: this.state.width - 40, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, backgroundColor: '#95CAFE' }}>
                <TouchableOpacity onPress={() => Actions.pop()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ fontSize: 30, color: '#213140', fontFamily: 'bebasNeue', alignSelf: 'center' }}>
                        finished
                     </Text>

                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

    </View>
    );
  }
}
/* eslint-enable global-require */

const styles = {
  wrapper: {
  },

  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textOrange: {
    fontSize: 30,
    color: '#213140',
    fontFamily: 'bebasNeue'
  },
  wholeScreen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 65,
    paddingBottom: 65
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F58C6C',
    borderRadius: 5,
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
//////   backgroundColor: 'rgba(0, 0, 0, 0.5)', gived tansparent!

const mapStateToProps = state => {
  const subjects = _.map(state.studassQueue, (val, uid) => {
    return { ...val, uid };
  });

    const { search, loading } = state.addSubject;
  return { subjects, search, loading };
};

export default connect(mapStateToProps, { fetchQueue, searchChanged, getHeight, getWidth, fetchAddSubjectQueue })(addSubjectAss);
