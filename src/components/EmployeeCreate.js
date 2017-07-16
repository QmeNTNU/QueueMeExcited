import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button } from './common';
import { employeeUpdate, employeeCreate } from '../actions';

class EmployeeCreate extends Component {
  onButtonPress() {
      const { name, phone, shift } = this.props;

      this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
      //shift er enten shift-verdien eller Monday
  }

  // metoden som setter opp hele aktiviteten kalles render
  render() {
    return (
        <Card>
          <CardSection>
            <Input
              label="Name"
              placeholder="Jane"
              value={this.props.name}
              onChangeText={text => this.props.employeeUpdate({ prop: 'name', value: text })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Phone Number"
              placeholder="555-555-555"
              value={this.props.phone}
              onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
            />
          </CardSection>

          <CardSection>
            <Text style={styles.pickerTextStyle}> Shift </Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.props.shift}
                onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value: day })}
              >
                <Picker.Item label="Monday" value="Monday" />
                <Picker.Item label="Tuesday" value="Tuesday" />
                <Picker.Item label="Wednesday" value="Wednesday" />
                <Picker.Item label="Thursday" value="Thursday" />
                <Picker.Item label="Friday" value="Friday" />
                <Picker.Item label="Saturday" value="Saturday" />
                <Picker.Item label="Sunday" value="Sunday" />
              </Picker>
          </CardSection>

          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Create
            </Button>
          </CardSection>
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
  const { name, phone, shift } = state.employeeForm;
  //employeeForm får vi fra EmployeeFormReducer hvor den kalles employeeForm
  return { name, phone, shift };
};
//kobler sammen klassen med actions slik vi kan aksessere ved hjelp av
//this.props.employeeCreate f.eks
export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);
