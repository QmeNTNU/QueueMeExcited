import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { favoriteAssSubjectListFetch } from '../actions';
import SubjectAssListItem from './SubjectAssListItem';

/*
Oppsumert hva som skjer
Viser listen over favorittfag som studass ved dynamisk ListView
*/

class FavoriteAssSubjectList extends Component {

  // må lytte til om det kommer noen nye elementer
  //actioncreater fetcher liste av subjects
  componentWillMount() {
    this.props.favoriteAssSubjectListFetch();

    this.createDataSource(this.props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.favoriteAssSubjectList);
  }


  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component
    //will be rendered with
    //this.props is still the old set of props
    this.createDataSource(nextProps);
  }

  //
  createDataSource({ favoriteAssSubjectList }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(favoriteAssSubjectList);
  }

  renderRow(fagAss) {
    return <SubjectAssListItem fagAss={fagAss} />;
  }

  render() {
    console.log(this.props);

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
        All your subjects </Text>

        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />


        <Button
        onPress={() => Actions.addSubjectFormAss()}
        >
            Add your subjects
        </Button>

    </Card>
    );
  }
}

const mapStateToProps = state => {
  const favoriteAssSubjectList = _.map(state.favoriteAssSubjectList, (val, uid) => {
    return { ...val, uid }; // resultat eks {subject: 'ITGK Matlab'};
  }); // dette skrives til subjects og map gjør det om til array

  return { favoriteAssSubjectList };
};

// state.subjects er et objekt og har mange keyvalue pairs
// for each keyvalue pair kjør funksjonen (val, uid) =>
// funksjonen blir kalt med hver value og uid
export default connect(mapStateToProps, { favoriteAssSubjectListFetch })(FavoriteAssSubjectList);


/*
render() {
  console.log(this.props);
  return (
  <Card>
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />

      <Button
      style={{ flex: 1, height: 5 }}
      onPress={() => Actions.addSubjectForm()}
      >
          Add your subjects
      </Button>

  </Card>
  );
}
}
*/
