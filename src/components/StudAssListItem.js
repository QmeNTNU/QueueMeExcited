import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

/*
Oppsummert hva som skjerm
Lager ListItem til ListView som viser tilgjengelige studasser StudAssList
*/

class StudAssListItem extends Component {

 //onRowPress tar deg videre til neste skjerm ved nøkkel fra router, har bare lagt inn
 //en random skjerm for å sjekke at funker, endre favoriteStudent... med ønsket nøkkel
  onRowPress() {
    Actions.favoriteStudentSubjectList({ assistant: this.props.assistant });
  }

  render() {
    const { studentAssistant } = this.props.assistant;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {studentAssistant}
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

export default StudAssListItem;
