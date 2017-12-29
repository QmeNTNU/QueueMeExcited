import { Actions } from 'react-native-router-flux';

export const Student = () => {
  return () => {
    Actions.favoriteStudentSubjectList(); //sends user to from homeform to student functions
  };
};

export const studentAssistant = () => {
  return () => {
    Actions.favoriteAssSubjectList(); //sends user from homeform to studass functions
  };
};
