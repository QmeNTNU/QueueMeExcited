import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;
  return (
     <Modal
       visible={visible}
       transparent
       animationType="slide"
       onRequestClose={() => {}} //setter in empty funksjon siden ingenting skal skje
     >
       <View style={containerStyle}>
         <CardSection style={cardSectionStyle}>
           <Text style={textStyle}>
             {children}
           </Text>
         </CardSection>

         <CardSection>
           <Button onPress={onAccept}>Yes</Button>
           <Button onPress={onDecline}>No</Button>
         </CardSection>
       </View>
     </Modal>
   );
 };

//lager klassen re-usable slik at vi har children = tekst
// f.eks "Vil du sparke denne personen"
// og vi gir klassen to funksjoner onAccept og onDecline
// som blir laget i en annen klasse som bruker Confirm

const styles = {
  cardSectionStyle: {
    justifyContent: 'flex-end' //popup i midten
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)', //0.75 gjør den litt gjennomsiktig
    flex: 1
  }
};

export { Confirm };
