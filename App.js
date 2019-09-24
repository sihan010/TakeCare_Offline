import React, { Component } from 'react';
import { StatusBar, AsyncStorage } from 'react-native';
import PatientDrawer from './src/navigation/PatientDrawer';
import DoctorDrawer from './src/navigation/DoctorDrawer';
import StartUp from './src/routes/StartUp';
import StorageKeys from './src/constants/asyncStorageKeys.json';
import Splash from './src/components/Splash';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      splash: true
    };
  }

  componentDidMount() {
    let d = {
      name: 'Dr. Monira Afroz',
      phone: '01711111111',
      password: '123456',
      type: 'd'
    };
    AsyncStorage.setItem(StorageKeys.Doctor, JSON.stringify(d)).then(() => {
      console.log('initial doctor added');
    });
    setTimeout(() => {
      this.setState({
        splash: false
      });
    }, 1000);
  }

  typeSelector = (v) => {
    this.setState({
      type: v
    });
  }

  render() {
    StatusBar.setBackgroundColor('#212F3D', true);
    let renderView = <StartUp typeSelector={(v) => this.typeSelector(v)} />;
    switch (this.state.type) {
      case 'd': renderView = <DoctorDrawer />; break;
      case 'p': renderView = <PatientDrawer />; break;
      default: renderView = <StartUp typeSelector={(v) => this.typeSelector(v)} />;
    }
    return this.state.splash ? <Splash /> : renderView;
  }
}
