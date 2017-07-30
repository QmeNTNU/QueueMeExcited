import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonWhite = ({ onPress, children }) => { //onPress fra AlbumDetail
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
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'bebasNeue'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#F58C6C',
    borderRadius: 5,
  },
};

export { ButtonWhite };
