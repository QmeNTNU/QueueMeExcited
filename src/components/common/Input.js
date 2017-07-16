import React from 'react';
import { TextInput, View, Text } from 'react-native';

//Her den faktiske teksten fra brukeren hentes
const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  //Henter inputStyle, labelStyle og containerStyle fra styles

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false} //ta av autocorrect
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        //underlineColorAndroid="transparent"//få vekk dritt underline
      />
    </View>
  );
};

const styles = {
  //text style
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
    //Flex er hvor mye plass som skal gå til inputStyle og labelStyle
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
    //flex => labelStyle = 1/3 pg inputStyle = 2/3
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
