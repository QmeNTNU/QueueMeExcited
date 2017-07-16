import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

/*
Oppsummert hva som skjer
Lager ListItems for ListView til liste som viser favorittfag som studass
*/

class SubjectAssListItem extends Component {

  onRowPress() {
    Actions.studAssList({ fagAss: this.props.fagAss });
  }

  render() {
    const { subject } = this.props.fagAss;

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

export default SubjectAssListItem;


/*
<Card
  style={{ flex: 1 }}
>
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }}
  >
      <Text style={styles.titleStyle}>
        {subject}
      </Text>
    </View>
  </Card>

*/
