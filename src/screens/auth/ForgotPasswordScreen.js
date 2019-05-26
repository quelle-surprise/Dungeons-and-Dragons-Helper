import React from 'react';
import {StyleSheet, View, Text, TextInput, Alert, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import {Font} from "expo";

export default class ForgotPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            fontLoaded: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Toms Handwritten': require('../../../assets/fonts/TomsHandwritten.ttf')
        });
        this.setState({fontLoaded: true});
    }

    onResetPasswordPress = (title, message) => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then((title, message) => {
                Alert.alert("Password reset email has been sent.", message);
            }, (error) => {
                Alert.alert(error.message, message);
            });
    };

    onBackToLoginPress = () => {
        this.props.navigation.navigate('Login')
    };

    render() {
        return (
            <View style={{paddingTop: 150, alignItems: "center"}}>


                <TextInput style={styles.textInput}
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
                <TouchableOpacity onPress={this.onResetPasswordPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Zresetuj hasło</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onBackToLoginPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Powrót</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
        width: 140,
        height: 40,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1
    },
    buttonText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 24,
        padding: 5,
        color: 'black',
    },
    textInput: {
        fontFamily: 'Toms Handwritten',
        fontWeight: '400',
        color: 'black',
        borderBottomWidth: 2,
        borderColor: "black",
        marginVertical: 20,
        padding: 10,
        height: 40,
        width: '55%',
        fontSize: 20,
        textAlign: 'center'
    },
});