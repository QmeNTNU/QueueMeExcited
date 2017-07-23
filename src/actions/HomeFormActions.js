import { Actions } from 'react-native-router-flux';

export const Student = () => {
  return () => {
    Actions.favoriteStudentSubjectList();
  };
};

export const studentAssistant = () => {
  return () => {
    Actions.favoriteAssSubjectList();
  };
};
