import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ButtonWhite = ({ onPress, children }) => { //onPress fra AlbumDetail
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <View style={styles.containerStyle}>
        <Text style={textStyle}>
            {children}
         </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#F58C6C',
    borderRadius: 5,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

export { ButtonWhite };
