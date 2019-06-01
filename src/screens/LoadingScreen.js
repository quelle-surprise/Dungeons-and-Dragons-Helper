import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default class LoadingScreen extends React.Component {

    // componentDidMount() {
    //     this.checkIfLoggedIn()
    // }
    //
    // checkIfLoggedIn() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             this.props.navigation.navigate('Test');
    //         } else {
    //             this.props.navigation.navigate('Login');
    //         }
    //     });
    // };

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

