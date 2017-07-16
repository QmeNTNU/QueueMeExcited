import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { subjectAssUpdate, subjectAssCreate } from '../actions';
import { View, Text, ListView, Picker } from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import { Router, Scene, Actions } from 'react-native-router-flux';


/*
Oppsumert hva som skjer
Brukes ikke atm
Laget for å kunne ha en dynamisk liste i fag man kan velge, men har gått bort fra dette
*/

class AddSubjectFormAss extends Component {
  onButtonPress() {
    const { subject } = this.props;

    this.props.subjectAssCreate({ subject: subject || 'ITGK Matlab' });
  }

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
            //style={{ flex: 1 }}
            selectedValue={this.props.subject}
            onValueChange={value => this.props.subjectAssUpdate({ prop: 'subject', value })}
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

  const mapStateToProps = (state) => {
  const { subject } = state.addSubjectFormAss;

  return { subject };
  };

  export default connect(mapStateToProps, {
  subjectAssUpdate, subjectAssCreate
  })(AddSubjectFormAss);


/*
onButtonPress() {
  const { subject } = this.props;

  this.props.subjectAssCreate({ subject: subject || 'ITGK Matlab' });
}

render() {
  return (
    <Card
    style={{ flex: 1 }}
    >

      <View>
        <Text style={styles.pickerTextStyle}> Select a subject </Text>
        <Picker
          //style={{ flex: 1 }}
          selectedValue={this.props.subject}
          onValueChange={value => this.props.subjectAssUpdate({ prop: 'subject', value })}
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

const mapStateToProps = (state) => {
const { subject } = state.addSubjectFormAss;

return { subject };
};

export default connect(mapStateToProps, {
subjectAssUpdate, subjectAssCreate
})(AddSubjectFormAss);
*/
