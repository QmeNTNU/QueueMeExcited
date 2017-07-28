import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonRed = ({ onPress, children }) => { //onPress fra AlbumDetail
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
     <Text style={textStyle}>
        {children}
     </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'bebasNeue'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'red',
    borderRadius: 5,


  }
};

export { ButtonRed };
