import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
  return (
      <View style={styles.spinnerStyle}>
        <ActivityIndicator size={size || 'large'} />
      </View>
  );
};

 //oppretter et size-object som settes lit prop fra const Spinner
 // size || 'large' gir oss at den enten skal settes til størrelsen eller large (som da er default)

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
