import React from 'react';
import {StyleSheet, View, TextInput, Button, Alert} from 'react-native';
import {CheckBox} from 'react-native-elements'

import * as firebase from 'firebase';

export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }

    onRegisterPress = (title, message) => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Podane hasła nie zgadzają się!", message);
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
            }, (error) => {
                Alert.alert("", error.message);
            });
    };

    onBackToLoginPress = () => {
        this.props.navigation.navigate('Login')
    };

    render() {
        return (
            <View style={{paddingTop: 150, alignItems: "center"}}>

                <TextInput style={{width: 200, height: 40, borderBottomWidth: 1, borderBottomColor: 'black'}}
                           value={this.state.email}
                           onChangeText={(text) => {
                               this.setState({email: text})
                           }}
                           placeholder="Wprowadź swój email"
                           keyboardType="email-address"
                           autoCapitalize="none"
                           autoCorrect={false}
                />

                <View style={{paddingTop: 10}}/>

                <TextInput style={{width: 200, height: 40, borderBottomWidth: 1, borderBottomColor: 'black'}}
                           value={this.state.password}
                           onChangeText={(text) => {
                               this.setState({password: text})
                           }}
                           placeholder="Hasło"
                           secureTextEntry={true}
                           autoCapitalize="none"
                           autoCorrect={false}
                />

                <View style={{paddingTop: 10}}/>

                <TextInput style={{width: 200, height: 40, borderBottomWidth: 1, borderBottomColor: 'black'}}
                           value={this.state.passwordConfirm}
                           onChangeText={(text) => {
                               this.setState({passwordConfirm: text})
                           }}
                           placeholder="Powtórz hasło"
                           secureTextEntry={true}
                           autoCapitalize="none"
                           autoCorrect={false}
                />
                <View style={{paddingTop: 20}}/>
                <CheckBox
                    title='Akceptuję regulamin aplikacji'
                />
                <Button title="UTWÓRZ KONTO" onPress={this.onRegisterPress} type="outline"/>
                <View style={{paddingTop: 20}}/>
                <Button title="Wróć do ekranu logowania" onPress={this.onBackToLoginPress}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({});