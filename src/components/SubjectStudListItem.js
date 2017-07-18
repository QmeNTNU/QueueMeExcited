import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FavoriteStudentSubjectList from './FavoriteStudentSubjectList';
import { Text, View, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { Confirm, CardSection } from './common';
import { subjectStudentUpdate, subjectStudentDelete } from '../actions';

/*
Oppsummert hva som skjer
Lager et listitems av typen  objekt fagStudent, som brukes i FavoriteStudentSubjectList
onRowPress() funksjonen gjør at man kan trykke på selve faget, og kommer videre til liste
over studasser tilgjengelig.
*/

class SubjectStudListItem extends Component {

  state = { showModal: false };

  //trykk på et fag og gå videre til liste over studasser i faget
  onRowPress() {
    Actions.studAssList({ fagStudent: this.props.fagStudent });
  }

  onAccept() {
    const { uid } = this.props.fagStudent;
    this.props.subjectStudentDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    const { subject } = this.props.fagStudent;

    return (
      //<TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
      <View>
      <TouchableHighlight
        onPress={this.onRowPress.bind(this)}
        onLongPress={() => this.setState({ showModal: !this.state.showModal })}
      >
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {subject}
            </Text>
          </CardSection>
        </View>
      </TouchableHighlight>

      <Confirm
        visible={this.state.showModal}
        onAccept={this.onAccept.bind(this)}
        onDecline={this.onDecline.bind(this)}
      >
        Are you sure you want to delete this subject?
      </Confirm>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { subject } = state.favoriteStudentSubjectList;

  return { subject };
};

export default connect(mapStateToProps, {
   subjectStudentDelete, subjectStudentUpdate })(SubjectStudListItem);
