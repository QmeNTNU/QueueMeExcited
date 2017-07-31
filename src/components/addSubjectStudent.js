import _ from 'lodash';
import React, { Component, } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Modal, Text, View, Image, Dimensions, ListView, TouchableOpacity } from 'react-native';
import { Spinner } from './common';
import ListItem from './ListItem';
import { fetchQueue, searchChanged, getWidth, getHeight, fetchAddSubjectQueue } from '../actions';

class addSubjectStudent extends Component {
  constructor(props) {
    const data = [];
    const ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
      super(props);
      this.state = {
        dataSource: ds.cloneWithRows(data),
        modalVisible: this.props.visible,
        height: '',
        width: ''
      };
    }
  //state = { modalVisible: this.props.visible, height: '', width: '' };

  componentWillMount() {
     //retireves and continues to  listen(not realy nessesary) for subjects
    const { ref } = firebase.database().ref('Subject');
    this.props.fetchQueue({ ref });

    //get list for comparison in listitem.js
    //const { compref } = firebase.database().ref('users');
    //starts the listener for
    //this.props.fetchAddSubjectQueue({ compref });

    //retireves dimension of screen to make sure views fits
    const { height, width } = Dimensions.get('window');
    this.setState({ height, width });
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextprops', nextProps);

    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ subjects }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.setState({
       dataSource: ds.cloneWithRows(subjects),

     });
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

renderScreen() {
  if (this.props.loading) {
  return <Spinner size="large" />;
}

/* experiment marre will need
if (this.props.subjects.length) {
  return (
    <Text style={{ flex: 1, alignSelf: 'center', marginTop: 100 }}>
      No subjects availible...
    </Text>
  );
}*/
return (
  <ListView
    enableEmptySections
    dataSource={this.state.dataSource}
    renderRow={this.renderRow}
  />
);
}
  /* eslint-disable global-require */
  render() {
  /*  const ar = this.props.search
      ? this.props.subjects[1] : this.props.assets;
      this.setState({
         dataSource: this.state.dataSource.cloneWithRows(ar),
       });*/
       console.log('props', this.props);
       console.log('subjects', this.props.subjects);
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
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: this.state.width - 40, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: '#F58C6C' }}>
                <Text style={styles.textOrange}>
                  Add subjects
                </Text>
              </View>

              <View style={{ flex: 6, width: this.state.width - 40, backgroundColor: '#ffffff' }}>
                {this.renderScreen()}
              </View>

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: this.state.width - 40, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, backgroundColor: '#ffffff' }}>
                <TouchableOpacity onPress={() => Actions.pop()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ fontSize: 30, fontFamily: 'bebasNeue', alignSelf: 'center' }}>
                        finish
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
/*
<View style={{ height: 60, width: this.state.width - 40, backgroundColor: '#ffffff'}}>
  <InputCreate
    placeholder="Search among subject"
    keyboardType='default'
    maxLength={100}
    width={this.state.width - 40}
    value={this.props.search}
    onChangeText={this.onSearchChange.bind(this)}
  />
</View>
*/

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
  //henter ut listen fra reduceren studassqueue
  const subjects = _.map(state.studassQueue, (val, uid) => {
    return { ...val, uid };
  });

    const { search, loading } = state.addSubject;
  return { subjects, search, loading };
};
 //kan skrive queue[0].name

export default connect(mapStateToProps, { fetchQueue, searchChanged, getHeight, getWidth, fetchAddSubjectQueue })(addSubjectStudent);
