import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    //(IMPORTE OUCHEBLE SAMMEN MED VIEW)<TouchableOpacity onPress={() => console.log('FUCK YEAH')}>
    // [ ] sier at containerStyle skal brukes, med mindre noe annet blir sagt
    <View style={[styles.containerStyle, props.style]}>
    {props.children}
    </View>
    //</TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
