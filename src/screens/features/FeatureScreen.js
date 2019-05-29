import React from 'react';
import {ScrollView, StyleSheet, TextInput, Button, Alert, Text, View} from 'react-native';
import * as firebase from 'firebase';

/***
 Test screen to test authentication functionality, it needs to be moved to profile component after creation.
 */
//TODO Move to profile component

export default class FeatureScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            newEmail: "",
        };

    }

    isLoggedByFacebook = () => {
        try {
            const provider = firebase.auth().currentUser.providerData[0].providerId;
            console.log(provider);
            return provider !== 'password';
        } catch (e) {
            console.log('Provider is set as null, user is not logged in to app');
        }
    };

    onSignOutPress = () => {
        firebase.auth().signOut();
    };

    reauthenticate = (currentPassword) => {
        const user = firebase.auth().currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    };


    onChangePasswordPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            const user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(() => {
                Alert.alert("Password was changed");
            }).catch((error) => {
                console.log(error.message);
            });
        }).catch((error) => {
            console.log(error.message)
        });
    };


    onChangeEmailPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(this.state.newEmail).then(() => {
                Alert.alert("Email was changed");
            }).catch((error) => {
                console.log(error.message);
            });
        }).catch((error) => {
            console.log(error.message)
        });
    };

    render() {
        if (this.isLoggedByFacebook() === true) {
            return (
                <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>
                    <Button title={'Wyloguj'} onPress={this.onSignOutPress}/>
                </ScrollView>
            )
        }
        return (
            <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>
                <Button title="Wyloguj" onPress={this.onSignOutPress}/>

                <TextInput style={styles.textInput} value={this.state.currentPassword}
                           placeholder="Obecne hasło" autoCapitalize="none" secureTextEntry={true}
                           onChangeText={(text) => {
                               this.setState({currentPassword: text})
                           }}
                />

                <TextInput style={styles.textInput} value={this.state.newPassword}
                           placeholder="Nowe hasło" autoCapitalize="none" secureTextEntry={true}
                           onChangeText={(text) => {
                               this.setState({newPassword: text})
                           }}
                />

                <Button title="Zmień hasło" onPress={this.onChangePasswordPress}/>

                <TextInput style={styles.textInput} value={this.state.newEmail}
                           placeholder="Nowy email" autoCapitalize="none" keyboardType="email-address"
                           onChangeText={(text) => {
                               this.setState({newEmail: text})
                           }}
                />

                <Button title="Zmień email" onPress={this.onChangeEmailPress}/>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    text: {color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20,},
    textInput: {
        borderWidth: 1,
        borderColor: "gray",
        marginVertical: 20,
        padding: 10,
        height: 40,
        alignSelf: "stretch",
        fontSize: 18,
    },
});