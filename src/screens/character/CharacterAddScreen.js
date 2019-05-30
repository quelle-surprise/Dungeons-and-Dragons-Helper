import React from "react";
import {StyleSheet, Text, Alert} from 'react-native';
import { Container} from "native-base";
import { Button, TextInput} from 'react-native-paper';
import * as firebase from 'firebase';

export default class CharacterDisplayScreen extends React.Component {
    
    state = {
        name: '',
        level: '',
        characterClass: ''
      };
    
    constructor(props) {
        super(props);

    }

    createNewCharacter = () => {
        let characterClass = this.state.characterClass
        let level = this.state.level
        let name = this.state.name

        firebase.database().ref('characters/').push({
            characterClass,
            level,
            name
        }).then((data)=>{
            console.log('successfully added to database')
        }).catch((error)=>{
            console.log('there were some problems during insetrion ')
        })
        Alert.alert("Dodano postać")
    }

    render() {        
        return (
            <Container style={styles.container}>
                <TextInput
                    label='Nazwa postaci'
                    type="outlined"
                    value={this.state.name}
                    onChangeText={name => this.setState({name: name})}
                />
                <TextInput
                    label='Level'
                    type="outlined"
                    value={this.state.level}
                    onChangeText={level => this.setState({level: level})}
                />
                <TextInput
                    label='Klasa postaci'
                    type="outlined"
                    value={this.state.characterClass}
                    onChangeText={characterClass => this.setState({characterClass: characterClass})}
                />

                <Button
                mode="outlined"
                color="black"
                style={styles.button}
                onPress={() => this.createNewCharacter()}
            >
                <Text style={styles.details}>Dodaj</Text>
            </Button>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    }
});