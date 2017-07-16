import _ from 'lodash';
import React, { Component, } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Modal, Text, View, Image, Dimensions, TouchableOpacity, ListView } from 'react-native';
import { InputCreate } from './common';
import ListItem from './ListItem';
import { fetchQueue, searchChanged } from '../actions';

class addSubjectStudent extends Component {

  state = { modalVisible: this.props.visible, height: '', width: '' };

  componentWillMount() {
    //retireves and continues to  listen(not realy nessesary) for subjects
    const { ref } = firebase.database().ref('Subject');
    this.props.fetchQueue({ ref });

    //retireves dimension of screen to make sure views fits
    const { height, width } = Dimensions.get('window');
    this.setState({ height, width });

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ subjects }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(subjects);
  }

  renderRow(subject) {
    return <ListItem subject={subject} />;
  }


  setModalVisible() {
    this.setState({ modalVisible: true });
  }
  setModalInvisible() {
    this.setState({ modalVisible: false });
  }

onSearchChange(text) {
  this.props.searchChanged(text);

  const filteredAssets = this.props.subjects.filter(function (subject) {
    const itemData = subject.emnenavn.toUpperCase();
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
    console.log('filteredAssets', filteredAssets);
    const copy = Object.assign({}, filteredAssets)
    console.log('copy', copy);
    const subjectssss = _.map(filteredAssets, (val, uid) => {
      return { ...val, uid };
    });
    console.log('subjectssss', subjectssss);


    this.createDataSource({ copy });
}


  /* eslint-disable global-require */
  render() {
    console.log(this.props);
    return (
      <View>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.wholeScreen}>
            <View style={styles.container}>
              <View style={{ height: 60, width: this.state.width - 40, backgroundColor: '#ffffff', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <InputCreate
                  placeholder="Search among subject"
                  keyboardType='default'
                  maxLength={100}
                  width={this.state.width - 40}
                  value={this.props.search}
                  onChangeText={this.onSearchChange.bind(this)}
                />
              </View>
              <View style={{ flex: 10 }}>
                <ListView
                  enableEmptySections
                  dataSource={this.dataSource}
                  renderRow={this.renderRow}
                />
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
  slideWelcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 20,
    marginTop: 50
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 20
  },
  slide2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95CAFE',
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
    color: '#254552',
    fontSize: 30,
    fontWeight: 'bold',
  },
  wholeScreen: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 40
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
    flex: 1,
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
  //henter ut listen fra reduceren studassqueue
  const subjects = _.map(state.studassQueue, (val, uid) => {
    return { ...val, uid };
  });
    const { search } = state.addSubject;

  return { subjects, search };
};
 //kan skrive queue[0].name

export default connect(mapStateToProps, { fetchQueue, searchChanged })(addSubjectStudent);
