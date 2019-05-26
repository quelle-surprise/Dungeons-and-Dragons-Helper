import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LoginScreen from './../screens/auth/LoginScreen';
import ForgotPasswordScreen from './../screens/auth/ForgotPasswordScreen';
import RegisterScreen from "../screens/auth/RegisterScreen";
import TestScreen from "../screens/TestScreen";
import SkillsScreen from "../screens/skills/SkillsScreen";
import SkillScreen from "../screens/skills/SkillScreen";

const AppSwitchNavigator = createSwitchNavigator({
    // Loading: {screen: LoadingScreen},
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
    Test: {screen: TestScreen},
    SkillsScreen: {screen: SkillsScreen},
    SkillScreen: {screen: SkillScreen},
});

const AuthenticationContainer = createAppContainer(AppSwitchNavigator);

export default class AuthenticationNavigation extends React.Component {

    render() {
        return <AuthenticationContainer/>;
    }
}
