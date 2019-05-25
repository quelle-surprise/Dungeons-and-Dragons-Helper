
import React from 'react';
import { ScrollView, StyleSheet, TextInput, Button, Alert, } from 'react-native';
import * as firebase from 'firebase';

/***
 Test screen to test authentication functionality, it needs to be deleted after creation of home screen.
 */
//TODO Delete after creation of home component

export default class TestScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            newEmail: "",
        };
    }

    onSignoutPress = () => {
        firebase.auth().signOut();
    };


    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    };


    onChangePasswordPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(() => {
                Alert.alert("Password was changed");
            }).catch((error) => { console.log(error.message); });
        }).catch((error) => { console.log(error.message) });
    };


    onChangeEmailPress = () => {
        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(this.state.newEmail).then(() => {
                Alert.alert("Email was changed");
            }).catch((error) => { console.log(error.message); });
        }).catch((error) => { console.log(error.message) });
    };

    render() {
        return (
            <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>
                <Button title="Sign out" onPress={this.onSignoutPress} />

                <TextInput style={styles.textInput} value={this.state.currentPassword}
                           placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
                           onChangeText={(text) => { this.setState({currentPassword: text}) }}
                />

                <TextInput style={styles.textInput} value={this.state.newPassword}
                           placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
                           onChangeText={(text) => { this.setState({newPassword: text}) }}
                />

                <Button title="Change Password" onPress={this.onChangePasswordPress} />

                <TextInput style={styles.textInput} value={this.state.newEmail}
                           placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
                           onChangeText={(text) => { this.setState({newEmail: text}) }}
                />

                <Button title="Change Email" onPress={this.onChangeEmailPress} />

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
    textInput: { borderWidth: 1, borderColor:"gray", marginVertical: 20, padding: 10, height: 40, alignSelf: "stretch", fontSize: 18, },
});