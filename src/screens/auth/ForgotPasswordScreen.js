
import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default class ForgotPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
    }

    onResetPasswordPress = (title, message) => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then((title, message) => {
                Alert.alert("Password reset email has been sent.", message);
            }, (error) => {
                Alert.alert(error.message, message);
            });
    };

    onBackToLoginPress = () => { this.props.navigation.navigate('Login') };

    render() {
        return (
            <View style={{paddingTop:50, alignItems:"center"}}>

                <Text>Forgot Password</Text>

                <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                           value={this.state.email}
                           onChangeText={(text) => { this.setState({email: text}) }}
                           placeholder="Email"
                           keyboardType="email-address"
                           autoCapitalize="none"
                           autoCorrect={false}
                />

                <Button title="Zresetuj hasło" onPress={this.onResetPasswordPress} />
                <Button title="Powrót do ekranu logowania" onPress ={() => this.props.navigation.navigate('Login')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});