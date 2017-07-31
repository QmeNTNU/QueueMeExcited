import React from 'react';
import { TextInput, View, Text } from 'react-native';

//Her den faktiske teksten fra brukeren hentes
const InputSignUp = ({ value, onChangeText, placeholder, secureTextEntry, label, borderRadius }) => {
  const { inputStyle, containerStyle, labelStyle } = styles;
  //Henter inputStyle, labelStyle og containerStyle fra styles

  return (
    <View style={containerStyle}>
      <View style={labelStyle}>{label}</View>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor='rgba(255, 255, 255, .5)'
        autoCorrect={false} //ta av autocorrect
        style={inputStyle}
        value={value}
        underlineColorAndroid='rgba(0,0,0,0)'
        onChangeText={onChangeText}
        borderRadius={borderRadius}
      />
    </View>
  );
};

const styles = {
  //text style
  inputStyle: {
    flex: 6,
    textAlign: 'left',
    marginLeft: 20,
    color: '#ffffff',
    borderRadius: 5,
    fontSize: 20,
    //Flex er hvor mye plass som skal gå til inputStyle og labelStyle
  },

  containerStyle: {
    flex: 1,
    flexDirection: 'row', //ordnes horisontalt
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .3)',
    borderRadius: 5,


  },

  labelStyle: {
  flex: 1,
  padding: 15,
  backgroundColor: '#F58C6C',
  }
};

export { InputSignUp };
