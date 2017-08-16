import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegReducers from './RegReducers';
import AddSubjectFormAssReducer from './AddSubjectFormAssReducer';
import AssSubjectReducer from './AssSubjectReducer';
import StudAssListReducer from './StudAssListReducer';
import AddSubjectFormStudentReducer from './AddSubjectFormStudentReducer';
import StudentSubjectReducer from './StudentSubjectReducer';
import AddSubjectStudentReducer from './AddSubjectStudentReducer';
import SettingsReducers from './SettingsReducers';
import ForgotPasswordReducer from './ForgotPasswordReducer';
/////////////////////////////// have to import from my reducer
import CreateQueueReducer from './CreateQueueReducer';
import StudassQueueReducer from './StudassQueueReducer';
import CountReducer from './CountReducer';
import QueueInfoReducer from './QueueInfoReducer';
import InQueueReducer from './InQueueReducer';
import addSubjectReducer from './addSubjectReducer';
import getNameReducer from './getNameReducer';
import loadingReducer from './loadingReducer';
import StudassLockUpReducer from './StudassLockUpReducer';
////////////////////////////////

export default combineReducers({
  auth: AuthReducer,
  reg: RegReducers,
  settings: SettingsReducers,
  dSubjectFormAss: AddSubjectFormAssReducer,
  favoriteAssSubjectList: AssSubjectReducer,
  studAssList: StudAssListReducer,
  addSubjectFormStudent: AddSubjectFormStudentReducer,
  favoriteStudentSubjectList: StudentSubjectReducer,
  addSubjectListStudent: AddSubjectStudentReducer,
  resetPassword: ForgotPasswordReducer,
    ///////////////////////////////////////////
    createQueue: CreateQueueReducer,
    studassQueue: StudassQueueReducer,
    count: CountReducer,
    queueInfo: QueueInfoReducer,
    inQueue: InQueueReducer,
    addSubject: addSubjectReducer,
    nameRed: getNameReducer,
    loading: loadingReducer,
    lock: StudassLockUpReducer,
    //////////////////////////////////////////
});
