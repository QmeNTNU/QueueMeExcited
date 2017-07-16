import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonTextGreen = ({ onPress, children, disabled }) => { //onPress fra AlbumDetail
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} disabled={disabled} >
     <Text style={textStyle}>
        {children}
     </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#83e283'

  }
};

export { ButtonTextGreen };
