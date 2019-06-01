import React from "react";
import {Alert, Dimensions, StyleSheet, Text, ScrollView} from 'react-native';
import {Container, View} from 'native-base'
import {Button, List, Switch, TextInput} from 'react-native-paper';
import * as firebase from 'firebase';

export default class CharacterDisplayScreen extends React.Component {
    state = {
        additionalSkillsNames: [
            "Akrobatyka", "Arkana", "Atletyka", "Empatia", "Historia", "Medycyna", "Natura", "Opieka nad zwierzętami", "Oszustwo",
            "Perswazja", "Religia", "Skradanie", "Spostrzegawczość", "Sztuka przetrwania", "Śledztwo", "Występy", "Zastraszanie", "Zwinne palce"],
        name: "", characterClass: "", level: "", char: "", characterRace: "", provenance: "", proficiency: "",
        strength: "", dexterity: "", condition: "", intelligence: "", wisdom: "", charisma: "",
        additionalSkill: [false]
    };
    character = [];
    userId = "";

    constructor(props) {
        super(props);
        this.state.additionalSkill = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
        const {navigation} = this.props;
        this.character = navigation.getParam('character', [""]);
        this.userId = navigation.getParam('userId', "");

        console.log("Got user: " + this.userId)
        if (this.character.name !== "") {
            this.prepareFormForEditing(this.character)
        }
    }

    prepareFormForEditing = (character) => {
        this.state.name = character.name;
        this.state.characterClass = character.characterClass;
        this.state.level = character.level;
        this.state.char = character.char;
        this.state.characterRace = character.characterRace;
        this.state.provenance = character.provenance;
        this.state.proficiency = character.proficiency;
        this.state.strength = character.strength;
        this.state.dexterity = character.dexterity;
        this.state.condition = character.condition;
        this.state.intelligence = character.intelligence;
        this.state.wisdom = character.wisdom;
        this.state.charisma = character.charisma;
    };


    createNewCharacter = () => {
        console.log("pushing char to user: " + this.userId)
        firebase.database().ref(this.userId + '/characters/').push({
            additionalSkillsNames: this.state.additionalSkillsNames,
            name: this.state.name,
            characterClass: this.state.characterClass,
            level: this.state.level,
            char: this.state.char,
            characterRace: this.state.characterRace,
            provenance: this.state.provenance,
            proficiency: this.state.proficiency,
            strength: this.state.strength,
            dexterity: this.state.dexterity,
            condition: this.state.condition,
            intelligence: this.state.intelligence,
            wisdom: this.state.wisdom,
            charisma: this.state.charisma,
            additionalSkill: this.state.additionalSkill
        }).then(() => {
            console.log('successfully added to database')
        }).catch(() => {
            console.log('there were some problems during insetrion ')
        });
        Alert.alert("Dodano postać")
    };

    generateList = () => {
        let list = [];
        this.state.additionalSkillsNames.forEach((name, index) => {
            list.push(
                <List.Item
                    title={name}
                    left={() => <Switch
                        value={this.state.additionalSkill[index]}
                        onValueChange={() => {
                            let newTable = this.state.additionalSkill;
                            newTable[index] = !newTable[index];
                            this.setState({additionalSkill: newTable})
                        }}
                    />
                    }/>
            )
        });
        return list
    };

    generateTextInput = (label, value, onChange, style = null, keyboard = 'default') => {
        return (<TextInput
            label={label}
            type="outlined"
            style={style}
            value={value}
            keyboardType={keyboard}
            onChangeText={onChange}
        />)
    };

    render() {
        return (
            <Container style={styles.container}>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        {this.generateTextInput("Imię postaci", this.state.name, name => this.setState({name: name}), {flex: 0.5})}
                        {this.generateTextInput("Klasa", this.state.characterClass, characterClass => this.setState({characterClass: characterClass}), {flex: 0.5})}
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {this.generateTextInput("Poziom", this.state.level, level => this.setState({level: level}), {flex: 0.5}, 'numeric')}
                        {this.generateTextInput("Klasa", this.state.char, char => this.setState({char: char}), {flex: 0.5})}
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {this.generateTextInput("Rasa", this.state.characterRace, characterRace => this.setState({characterRace: characterRace}), {flex: 0.5})}
                        {this.generateTextInput("Pochodzenie", this.state.provenance, provenance => this.setState({provenance: provenance}), {flex: 0.5})}
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {this.generateTextInput("Premia z biegłości", this.state.proficiency, proficiency => this.setState({proficiency: proficiency}), {flex: 1}, 'numeric')}
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    {this.generateTextInput("Sił", this.state.strength, strength => this.setState({strength: strength}), styles.tableInput, 'numeric')}
                    {this.generateTextInput("Zre", this.state.dexterity, dexterity => this.setState({dexterity: dexterity}), styles.tableInput, 'numeric')}
                    {this.generateTextInput("Kon", this.state.condition, condition => this.setState({condition: condition}), styles.tableInput, 'numeric')}
                    {this.generateTextInput("Int", this.state.intelligence, intelligence => this.setState({intelligence: intelligence}), styles.tableInput, 'numeric')}
                    {this.generateTextInput("Mdr", this.state.wisdom, wisdom => this.setState({wisdom: wisdom}), styles.tableInput, 'numeric')}
                    {this.generateTextInput("Char", this.state.charisma, charisma => this.setState({charisma: charisma}), styles.tableInput, 'numeric')}
                </View>

                <Button
                    mode="outlined"
                    color="black"
                    style={styles.button}
                    onPress={() => this.createNewCharacter()}
                >
                    <Text>Dodaj</Text>
                </Button>

                <ScrollView>
                    {this.generateList()}
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    }, tableInput: {
        flex: Math.round((Dimensions.get('window').width) / 6)
    },
});