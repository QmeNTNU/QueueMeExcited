import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common';

/*
Oppsummert hva som skjer
Brukes ikke atm
Lager listitems til statisk list over fag man kan velge
*/

class AddSubjectStudentListItem extends Component {

  onRowPress() {

  }

  render() {
    const { subject } = this.props.addFagStudent;

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

export default AddSubjectStudentListItem;
