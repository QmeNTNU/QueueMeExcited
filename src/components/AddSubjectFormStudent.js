import _ from 'lodash';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { subjectStudentUpdate, subjectStudentCreate, addSubjectListStudentFetch } from '../actions';
import { View, Text, ListView, Picker } from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import { Router, Scene, Actions } from 'react-native-router-flux';
import AddSubjectStudentListItem from './AddSubjectStudentListItem';

/*
Oppsumert hva som skjer
Form hvor du kan legge til fag fra statisk liste over fag
Det som er kommentert ut i koden var for å ha en dynamisk liste over fag man kan velge fra,
ble kluss med staten til objektet så funket ikke
*/

class AddSubjectFormStudent extends Component {

  onButtonPress() {
    const { subject } = this.props;
    this.props.subjectStudentCreate({ subject: subject || 'ITGK Matlab' });
  }


  /*
  componentWillMount() {
    this.props.addSubjectListStudentFetch();
    this.createDataSource(this.props);
    const Ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource4 = Ds.cloneWithRows(this.props.FavoriteAssSubject);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ FavoriteAssSubject }) {
    const Ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource4 = Ds.cloneWithRows(FavoriteAssSubject);
  }

  renderRow(addFagStudent) {
    return <AddSubjectStudentListItem addFagStudent={addFagStudent} />;
  }
  <ListView
    enableEmptySections
    dataSource={this.dataSource4}
    renderRow={this.renderRow}
    style={{ flex: 1 }}
  />
*/

//console.log(this.props.fagStudent);
//console.log(this.props);

/*
plan: bytt ut picker med en flatlist
se https://facebook.github.io/react-native/docs/using-a-listview.html
*/
  render() {
    return (
      <Card
      style={{ flex: 1 }}
      >
        <View>
          <Text style={styles.pickerTextStyle}> Select a subject </Text>
          <Picker
            selectedValue={this.props.subject}
            onValueChange={value => this.props.subjectStudentUpdate({ prop: 'subject', value })}
          >
            <Picker.Item label="ITGK Matlab" value="ITGK Matlab" />
            <Picker.Item label="ITGK Python" value="ITGK Python" />
            <Picker.Item label="Databaser" value="Databaser" />
            <Picker.Item label="Objektorientert" value="Objektorientert" />
          </Picker>
        </View>

        <View>
          <Button
            style={{ flex: 1 }}
            onPress={this.onButtonPress.bind(this)}
          >
              Finished
          </Button>
        </View>
      </Card>


    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

/*state.Subjet er objektet av Subject, og for hvert element i det
objektet tar ut Subject-model (altså hva den inneholder) som val
og nøkkelen, som her blir
_.map = for each value pair kjør funksjonen som følger
returnerer et nytt objekt og pusjer inn alle val fra Subject med uid
tar deretter dette nye objektet og skriver
til array const Subject = ..... som map gjør automatisk
returnerer deretter dette Subject objektet som har en array
*/

/*
const mapStateToProps = state => {
  const FavoriteAssSubject = _.map(state.FavoriteAssSubject, (val, uid) => {
    return { ...val, uid };
  });
  return { FavoriteAssSubject };
};

export default connect(mapStateToProps,
{ addSubjectListStudentFetch })(AddSubjectFormStudent);
*/

const mapStateToProps = (state) => {
  const { subject } = state.addSubjectFormStudent;
    return { subject };
};

export default connect(mapStateToProps, {
  subjectStudentUpdate, subjectStudentCreate,
})(AddSubjectFormStudent);
