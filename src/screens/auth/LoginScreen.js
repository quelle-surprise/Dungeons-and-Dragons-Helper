
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator, NavigationActions } from "react-navigation";
import RegisterScreen from "./RegisterScreen";
import Hyperlink from 'react-native-hyperlink'
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    onLoginPress = (title, message) => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message, message); });
    };

    render() {
        return (
            <View style={{paddingTop:100, alignItems:"center"}}>

                <TextInput style={{width: 200, height: 40, borderBottomWidth: 2, borderBottomColor: 'black'}}
                           value={this.state.email}
                           onChangeText={(text) => { this.setState({email: text}) }}
                           placeholder="Wprowadź swój email"
                           keyboardType="email-address"
                           autoCapitalize="none"
                           autoCorrect={false}
                />

                <View style={{paddingTop:10}} />

                <TextInput style={{width: 200, height: 40, borderBottomWidth: 2, borderBottomColor: 'black'}}
                           value={this.state.password}
                           onChangeText={(text) => { this.setState({password: text}) }}
                           placeholder="Wprowadź swoje hasło"
                           secureTextEntry={true}
                           autoCapitalize="none"
                           autoCorrect={false}
                />
                <View style={{paddingTop:10}} />
                <Button title="Zaloguj się" onPress ={this.onLoginPress()}/>
                <View style={{paddingTop:10}} />
                <Hyperlink onPress ={() => this.props.navigation.navigate('ForgotPassword')}>
                    <Text style={ { fontSize: 15, color: 'blue'} }>
                        Zresetuj hasło
                    </Text>
                </Hyperlink>
                <View style={{paddingTop:50}} />
                <Text> Nie masz konta?</Text>
                <Button title="Zarejestruj się" onPress ={() => this.props.navigation.navigate('Register')} />
            </View>
        );
    }
}
