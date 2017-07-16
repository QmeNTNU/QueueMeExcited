import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

/*
Oppsummert hva som skjer
Lager et listitems av typen  objekt fagStudent, som brukes i FavoriteStudentSubjectList
onRowPress() funksjonen gjør at man kan trykke på selve faget, og kommer videre til liste
over studasser tilgjengelig.
*/

class SubjectStudListItem extends Component {

  //trykk på et fag og gå videre til liste over studasser i faget
  onRowPress() {
    Actions.studAssList({ fagStudent: this.props.fagStudent });
  }

  render() {
    const { subject } = this.props.fagStudent;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {subject}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

export default SubjectStudListItem;
