import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApiKeys from './src/constants/ApiKeys';
import * as firebase from 'firebase';
import AuthenticationNavigation from "./src/navigation/AuthenticationNavigation";
import TestScreen from "./src/screens/TestScreen";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
    };

    // Firebase initialization
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!user});
  };

  render() {
    if(this.state.isAuthenticated) {
      return(<TestScreen/>)
    } else {
      return (
          <AuthenticationNavigation/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
