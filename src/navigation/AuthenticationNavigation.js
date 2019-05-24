import { Notifications } from 'expo';
import React from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

import LoginScreen from './../screens/auth/LoginScreen';
import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';
import RegisterScreen from "../screens/auth/RegisterScreen";
import TestScreen from "../screens/TestScreen";

const AppSwitchNavigator = createSwitchNavigator({
    LoginScreen: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
    Test: { screen: TestScreen}
});

const AuthenticationContainer = createAppContainer(AppSwitchNavigator);

export default class AuthenticationNavigation extends React.Component {

    render() {
        return <AuthenticationContainer />;
    }
}
