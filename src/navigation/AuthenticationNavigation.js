import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LoginScreen from './../screens/auth/LoginScreen';
import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';
import RegisterScreen from "../screens/auth/RegisterScreen";
import TestScreen from "../screens/TestScreen";
import LoadingScreen from "../screens/LoadingScreen";

const AppSwitchNavigator = createSwitchNavigator({
    Loading: {screen: LoadingScreen},
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
    Test: {screen: TestScreen}
});

const AuthenticationContainer = createAppContainer(AppSwitchNavigator);

export default class AuthenticationNavigation extends React.Component {

    render() {
        return <AuthenticationContainer/>;
    }
}
