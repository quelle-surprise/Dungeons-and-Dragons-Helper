import React from "react";
import {StyleSheet, Text, Alert, FlatList, Image, Dimensions} from 'react-native';
import {ListItem} from 'native-base'
import { List } from 'react-native-paper';
import {Table, Row, Rows} from 'react-native-table-component';
import {
    Container,
    Fab,
    View,
    Segment
} from "native-base";
import { Button, TextInput} from 'react-native-paper';
import Icons from "assets/icons";
import * as firebase from 'firebase';
import { Switch } from 'react-native-paper';

export default class CharacterDisplayScreen extends React.Component {
    
    state = {
        additionalSkillsNames: [
            "Akrobatyka", "Arkana","Atletyka", "Empatia","Historia","Medycyna", "Natura","Opieka nad zwierzętami","Oszustwo",
            "Perswazja", "Religia","Skradanie","Spostrzegawczość","Sztuka przetrwania","Śledztwo","Występy","Zastraszanie","Zwinne palce"],
            imię: "", klasa: "", poziom: "",  charakter: "", rasa: "", pochodzenie: "", proficiency: "",
            Sił: "", Zre: "", Kon: "", Int:"", Mdr:"", Cha:"",
            switchValue: []
      };
    
    constructor(props) {
        super(props);
        this.state.switchValue = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    }

    createNewCharacter = (val) => {
        let additionalSkillsNames = val.additionalSkillsNames
        let imię = val.imię 
        let klasa = val.klasa 
        let poziom = val.poziom  
        let charakter = val.charakter 
        let rasa = val.rasa 
        let pochodzenie = val.pochodzenie
        let siła = val.Sił 
        let zręczność = val.Zre 
        let kondycja = val.Kon 
        let inteligencja = val.Int 
        let mądrość = val.Mdr 
        let charyzma = val.Cha
        let proficiency = val.proficiency
        let additionalSkill = val.switchValue
        firebase.database().ref('characters/').push({
            additionalSkillsNames, imię, klasa, poziom, charakter, rasa, pochodzenie, siła, zręczność, kondycja, inteligencja, mądrość, charyzma, additionalSkill, proficiency
        }).then((data)=>{
            console.log('successfully added to database')
        }).catch((error)=>{
            console.log('there were some problems during insetrion ')
        })
        Alert.alert("Dodano postać")
    }

    generateList = () => {
        let list = []
        this.state.additionalSkillsNames.forEach( (name, index) => {
            list.push(
                <List.Item
                title={name}
                left={() => <Switch
                                value={this.state.switchValue[index] }
                                onValueChange={() => { this.state.switchValue[index] = !this.state.switchValue[index]}}
                                    />
                }/>  
            )
        });
        return list
    }
    render() {        
        return (
            <Container style={styles.container}>
            <View>
                <View style={{ flexDirection:'row'}}>
                    <TextInput
                        label='Imię postaci'
                        type="outlined"
                        style={{flex: 0.5}}
                        value={this.state.imię}
                        onChangeText={imię => this.setState({imię: imię})}
                    />
                    <TextInput
                        label='Klasa'
                        type="outlined"
                        style={{flex: 0.5}}
                        value={this.state.klasa}
                        onChangeText={klasa => this.setState({klasa: klasa})}
                    />
                </View>
                <View style={{ flexDirection:'row' }}>
                    <TextInput
                        label='Poziom'
                        type="outlined"
                        style={{flex: 0.5}}
                        value={this.state.poziom}
                        keyboardType={'numeric'}
                        onChangeText={poziom => this.setState({poziom: poziom})}
                    />
                    <TextInput
                        label='Charakter'
                        type="outlined"
                        style={{flex: 0.5}}
                        value={this.state.charakter}
                        onChangeText={charakter => this.setState({charakter: charakter})}
                    />
                    
                </View>
                <View style={{ flexDirection:'row' }}>
                    <TextInput
                        label='Rasa'
                        type="outlined"
                        style={{flex: 0.5}}
                        value={this.state.rasa}
                        onChangeText={rasa => this.setState({rasa: rasa})}
                    />
                    <TextInput
                        label='Pochodzenie'
                        type="outlined"
                        style={{flex: 0.5}}
                        value={this.state.pochodzenie}
                        onChangeText={pochodzenie => this.setState({pochodzenie: pochodzenie})}
                    />
                </View>
                    <View style={{ flexDirection:'row'}}>
                        <TextInput
                            label='Premia z biegłości'
                            type="outlined"
                            style={{flex: 1}}
                            value={this.state.proficiency}
                            keyboardType={'numeric'}
                            onChangeText={proficiency => this.setState({proficiency: proficiency})}
                        />
                    </View>
            </View>

            <View style={{ flexDirection:'row' }}>
                <TextInput
                    label='Sił'
                    type="outlined"
                    style={styles.tableInput}
                    value={this.state.Sił}
                    keyboardType={'numeric'}
                    onChangeText={Sił => this.setState({Sił: Sił})}
                />
                <TextInput
                    label='Zre'
                    type="outlined"
                    style={styles.tableInput}
                    value={this.state.Zre}
                    keyboardType={'numeric'}
                    onChangeText={Zre => this.setState({Zre: Zre})}
                />
                <TextInput
                    label='Kon'
                    type="outlined"
                    style={styles.tableInput}
                    value={this.state.Kon}
                    keyboardType={'numeric'}
                    onChangeText={Kon => this.setState({Kon: Kon})}
                />
                <TextInput
                    label='Int'
                    type="outlined"
                    style={styles.tableInput}
                    value={this.state.Int}
                    keyboardType={'numeric'}
                    onChangeText={Int => this.setState({Int: Int})}
                />
                <TextInput
                    label='Mdr'
                    type="outlined"
                    style={styles.tableInput}
                    value={this.state.Mdr}
                    keyboardType={'numeric'}
                    onChangeText={Mdr => this.setState({Mdr: Mdr})}
                />
                <TextInput
                    label='Cha'
                    type="outlined"
                    style={styles.tableInput}
                    value={this.state.Cha}
                    keyboardType={'numeric'}
                    onChangeText={Cha => this.setState({Cha: Cha})}
                />
            </View>
            <View>
            </View>
            
                <Button
                mode="outlined"
                color="black"
                style={styles.button}
                onPress={() => this.createNewCharacter(this.state)}
            >
                <Text>Dodaj</Text>
            </Button>

            <List.Section>
                {this.generateList()}
            </List.Section>

            <Fab
            containerStyle={{}}
            position="bottomRight"
            style={{ backgroundColor: "#5067FF" }}
            onPress={() => this.setState({editModeEnabled: false})}
        >
            <View><Image source={Icons.charScreenIcons.share}/></View>
        </Fab>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },    tableInput: {
        flex: Math.round((Dimensions.get('window').width)/6)
    },
});