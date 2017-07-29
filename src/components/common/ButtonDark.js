import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ButtonDark = ({ onPress, children }) => { //onPress fra AlbumDetail
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
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'bebasNeue'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#213140',
    borderRadius: 5,
  },
  containerStyle: {
    flex: 1,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

export { ButtonDark };
