import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button1 = ({ onPress, children }) => { //onPress fra AlbumDetail
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} >
     <Text style={textStyle}>
        {children}
     </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    //borderRadius: 5,
    backgroundColor: '#F58C6C',
    borderWidth: 1,
    borderColor: '#0000ff',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5
  }
};

export { Button1 };
