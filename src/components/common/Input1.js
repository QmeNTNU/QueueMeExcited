import React from 'react';
import { TextInput, View, Text } from 'react-native';

//Her den faktiske teksten fra brukeren hentes
const Input1 = ({ value, onChangeText, placeholder, secureTextEntry, label }) => {
  const { inputStyle, containerStyle, labelStyle } = styles;
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
      />
    </View>
  );
};

const styles = {
  //text style
  inputStyle: {
    backgroundColor: '#fff',
    //underlineColorAndroid: 'rgba(0,0,0,0)',
    textAlign: 'left',
    flex: 5,
    color: '#000',
    //borderRadius: 5,
    fontWeight: '300',
    borderWidth: 1,
    borderColor: '#007aff'
    //Flex er hvor mye plass som skal gå til inputStyle og labelStyle
  },

  containerStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    flex: 1,
    flexDirection: 'row', //ordnes horisontalt
    alignItems: 'center',
    backgroundColor: 'rgb(149, 202, 254)'

  },

  labelStyle: {
  flex: 1,
  rezieMode: 'contain'
  }
};

export { Input1 };
