import { STUDASS_COUNT_SUCCESSFULL } from './types';


export const getCount = ({ ref }) => { //retrieves and saves the count of children at ref
  return (dispatch) => {
        ref.on('value', snapshot => {
          dispatch({ type: STUDASS_COUNT_SUCCESSFULL, payload: snapshot.numChildren() });
      });
  };
};
