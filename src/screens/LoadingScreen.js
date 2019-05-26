import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component {

    componentDidMount() {
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Test');
            } else {
                this.props.navigation.navigate('Login');
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

