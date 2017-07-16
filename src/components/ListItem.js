import React, { Component } from 'react';
import { Text, View } from 'react-native';

class ListItem extends Component {
  render() {
    const { emnekode, emnenavn } = this.props.subject;

    return (
      <View style={styles.rowStyle}>
        <Text style={styles.titleStyle}>
          {emnekode}
        </Text>
        <Text style={styles.titleStyle}>
          {emnenavn}
        </Text>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  rowStyle: {
    height: 50,
    marginTop: 2,
    backgroundColor: '#ffffff'
  }
};

export default ListItem;
