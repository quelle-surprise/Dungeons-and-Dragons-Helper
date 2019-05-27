import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container } from 'native-base'
import ApiKeys from './src/constants/ApiKeys';
import * as firebase from 'firebase';
import AuthenticationNavigation from "./src/navigation/AuthenticationNavigation";
import HeaderComponent from "./src/components/HeaderComponent";
import DashboardNavigation from './src/navigation/DashboardNavigation';

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
      return(
        <Container>
          <HeaderComponent/>
          <DashboardNavigation/>
        </Container>
        )
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
