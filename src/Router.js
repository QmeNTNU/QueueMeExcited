import React from 'react';
import { Router, Scene, Actions, Modal, ActionConst } from 'react-native-router-flux';
import { Image } from 'react-native';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

import FavoriteAssSubjectList from './components/FavoriteAssSubjectList';
import AddSubjectFormAss from './components/AddSubjectFormAss';
import StudAssList from './components/StudAssList';
import favoriteStudentSubjectList from './components/FavoriteStudentSubjectList';
import AddSubjectFormStudent from './components/AddSubjectFormStudent';
import HomeForm from './components/HomeForm';
import Settings from './components/Settings';
import Start from './components/Start';
import ForgotPassword from './components/ForgotPassword';
////////////ANDERS////////////////////
import CreateQueue from './components/CreateQueue';
import StudassQueue from './components/StudassQueue';
import QueueInfo from './components/QueueInfo';
import InQueue from './components/InQueue';
import modal from './components/modal';//HUSK OG IMPORTER REACT-NATIVE-SWIPE
import addSubjectStudent from './components/addSubjectStudent';
import addSubjectAss from './components/addSubjectAss';
import deleteSlide from './components/deleteSlide';


////////////Anders////////////////////////////

const RouterComponent = () => {
  /* eslint-disable global-require */

  //making more buckets makes the back-button go away
  //all scenes in same bucket will have bavkbuton automativly
  return (

    //router will override the top of the screen
    //have to set a padding to the top
    //onright toghettehr with righttile will set a button on top right side by default
    //se react-native-router-flux github in favorites
<Router barButtonIconStyle={{ tintColor: 'white' }} titleStyle={{ fontFamily: 'bebasNeue', color: '#ffffff', fontSize: 30 }} navigationBarStyle={{ backgroundColor: '#95CAFE', height: 70 }} sceneStyle={{ backgroundColor: '#95CAFE' }}>
<Scene key="modal" component={Modal} modal >
  <Scene key="root" >

    <Scene
      key="startScreen"
      component={Start}
      hideNavBar
      sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
    />

    <Scene key="auth" hideNavBar>
            <Scene
              key="login"
              component={LoginForm}
              title="QUEUE ME"
              initial
              sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
            />
            <Scene
              key='signup'
              component={SignUpForm}
              title="REGISTRATION"
              sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
            />
            <Scene
              key="forgotPassword"
              component={ForgotPassword}
              title="RESET PASSWORD"
              sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
            />
    </Scene>

    <Scene key="homePage" type={ActionConst.RESET} >
          <Scene
            key="home"
            component={HomeForm}
            title="HOME"
            inital
            onRight={() => Actions.settings()}
            rightButtonImage={require('./components/images/settings.png')}
            type={ActionConst.RESET}
            sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
          />
          <Scene
            key="settings"
            component={Settings}
            title="SETTINGS"
            sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
          />

          <Scene
            key="favoriteStudentSubjectList"
            component={favoriteStudentSubjectList}
            title="Subjects"
            sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
          />

          <Scene
            key="favoriteAssSubjectList"
            component={FavoriteAssSubjectList}
            title="Subjects"
            sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
          />
          <Scene
            key="studAssList"
            component={StudAssList}
            title="Studasses"
            sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
          />
          <Scene
            key="queueInfo"
            component={QueueInfo}
            title="Queue info"
            sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
          />
          <Scene
            key="createQueue"
            component={CreateQueue}
            title="Your Queue"
            sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
          />
          <Scene
            key="studassQueue"
            component={StudassQueue}
            title="Queue"
            hideNavBar
            sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
          />
          <Scene
            key="inQueue"
            component={InQueue}
            title="In Queue"
            hideNavBar
            sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
          />
    </Scene>

  </Scene>

  <Scene
    key="addSubjectStudent"
    component={addSubjectStudent}
    modal
    sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
  />
  <Scene
    key="addSubjectAss"
    component={addSubjectAss}
    modal
    sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
  />
  <Scene
    key="welcome"
    component={modal}
    modal
    sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
  />
  <Scene
    key="deleteSlide"
    component={deleteSlide}
    modal
    sceneStyle={{ paddingTop: 70, backgroundColor: '#95CAFE' }}
    initial
  />

</Scene>
</Router>

  );
};
//          rightButtonImage={require('./images/alarm3.png')}

/* eslint-enable global-require */

export default RouterComponent;
