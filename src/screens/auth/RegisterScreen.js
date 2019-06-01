import React from 'react';
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import * as firebase from 'firebase';
import {Font} from "expo";
import Icons from "assets/icons";

export default class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
            fontLoaded: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Toms Handwritten': require('../../../assets/fonts/TomsHandwritten.ttf')
        });
        this.setState({fontLoaded: true});
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
        if (this.state.fontLoaded === true) {
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

                    <TextInput style={styles.textInput}
                               value={this.state.password}
                               onChangeText={(text) => {
                                   this.setState({password: text})
                               }}
                               placeholder="Wprowadź swoje hasło"
                               secureTextEntry={true}
                               autoCapitalize="none"
                               autoCorrect={false}
                    />

                    <View style={{paddingTop: 10}}/>

                    <TextInput style={styles.textInput}
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
                    <TouchableOpacity onPress={this.onRegisterPress}>
                        <ImageBackground source={Icons.buttonIcons.buttonLight} style={{width: 140, height: 40}}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Utwórz konto</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{paddingTop: 10}}/>
                    <TouchableOpacity onPress={this.onBackToLoginPress}>
                        <ImageBackground source={Icons.buttonIcons.buttonLight} style={{width: 140, height: 40}}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Powrót</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large"/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginBottom: 10,
        width: 150,
        alignItems: 'center'
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
    }
});