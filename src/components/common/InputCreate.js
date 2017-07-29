import React from 'react';
import { TextInput, View } from 'react-native';

//Her den faktiske teksten fra brukeren hentes
const InputCreate = ({ value, onChangeText, placeholder, secureTextEntry, keyboardType, maxLength, width }) => {
  const { inputStyle, containerStyle } = styles;
  //Henter inputStyle, labelStyle og containerStyle fra styles

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false} //ta av autocorrect
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize='words'
        style={inputStyle}
        width={width}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid='#F58C6C' //få vekk dritt underline
      />
    </View>
  );
};

const styles = {
  //text style
  inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 1
    //Flex er hvor mye plass som skal gå til inputStyle og labelStyle
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  }
};

export { InputCreate };
