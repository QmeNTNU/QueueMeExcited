import { STUDASS_COUNT_SUCCESSFULL } from './types';


export const getCount = ({ ref }) => {
  //henter ut employees fra database
  return (dispatch) => {
        ref.on('value', snapshot => {
          dispatch({ type: STUDASS_COUNT_SUCCESSFULL, payload: snapshot.numChildren() });
      });
  };
};
