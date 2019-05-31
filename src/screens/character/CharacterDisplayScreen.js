import React from "react";
import {StyleSheet, Text, Alert, FlatList, Image, Dimensions} from 'react-native';
import {ListItem} from 'native-base'
import {Table, Row, Rows} from 'react-native-table-component';
import {
    Container,
    Fab,
    View,
    Segment
} from "native-base";
import { Button, TextInput} from 'react-native-paper';
import Icons from "assets/icons";

export default class CharacterDisplayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            characterId: "",
            character: [],
            seg: 1,
            editModeEnabled: false,
            tableHead: ['Sił', 'Zre', 'Kon', 'Int', 'Mdr', 'Cha'],
            additionalSkillsNames: [
                "Akrobatyka", "Atletyka","Arkana", "Empatia","Historia","Medycyna", "Natura","Opieka nad zwierzętami","Oszustwo",
                "Perswazja", "Religia","Skradanie","Spostrzegawczość","Sztuka przetrwania","Śledztwo","Występy","Zastraszanie","Zwinne palce"],
            additionalSkillsStat: [
                "Zre", "Int","Sił", "Mdr","Int","Mdr", "Int","Mdr","Cha",
                "Cha", "Int","Zre","Mdr","Mdr","Int","Cha","Cha","Zre"],
            additionalSkillsWithValues: [],
            statisticsTableData: [],
            proficiencyTableData: []
        };
        const {navigation} = this.props;
        this.state.character = navigation.getParam('character', [""]);
        this.state.characterId = navigation.getParam('characterId', "");

        this.generateStatisticsTable()
        this.generateAdditionalSkillsList(this.state.additionalSkillsStat, 
            this.state.character.proficiency, this.state.additionalSkillsNames)
    }

    shareCharacterEvent = (chadacterId) => {
        this.props.navigation.navigate('ShareCharacterScreen', {
            characterId: chadacterId,
        });
    }

    generateAdditionalSkillsList = (statistics, proficiency, names ) => {
        let tab = []
        statistics.forEach( (stat, index) => {
            switch(stat) {
                case "Zre":
                        tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.zręczność, proficiency, names[index]))
                    break
                case "Int":
                        tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.inteligencja, proficiency, names[index]))
                break
                case "Sił":
                        tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.siła, proficiency, names[index]))
                    break
                case "Mdr":
                        tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.mądrość, proficiency, names[index]))
                    break
                case "Cha":
                        tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.charyzma, proficiency, names[index]))
                    break
                case "Kon":
                        tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.kondycja, proficiency, names[index]))
                    break
            }
        });
        this.state.additionalSkillsWithValues = tab
    }

    chekProficiency = (addProficiency, statvalue, proficiency, statname) => {
        if(addProficiency == 1) {
            return ((statvalue + proficiency) + " " + statname)
        }
        else
            return (statvalue + " " + statname)
    }

    generateStatisticsTable = () => {
        let character = this.state.character
        let statistics = [
            character.siła, character.zręczność,
            character.kondycja, character.inteligencja,
            character.mądrość, character.charyzma]
        this.generateTableWithModifiersRow(statistics)
    }

    generateTableWithModifiersRow = (statistics) => {
        let modifiers = []
        statistics.forEach(stat => {
            modifiers.push(Math.floor((stat - 10) / 2))
        });
        this.state.statisticsTableData = [statistics, modifiers]
        this.generateProficiencyTable(modifiers)
    }

    generateProficiencyTable = (modifiers) => {
        let proficiency = []
        modifiers.forEach(modifier => {
            proficiency.push(modifier + this.state.character.proficiency)
        });
        this.state.proficiencyTableData.push(proficiency)
    }

    render() {
        return (
            <Container style={styles.container}>

                {this.state.editModeEnabled === true &&
                <View>
                    <View style={{ flexDirection:'row', width: Math.round(Dimensions.get('window').width) }}>
                        <TextInput
                            label='Imię postaci'
                            type="outlined"
                            style={{flex: 0.5}}
                            value={this.state.characterClass}
                            onChangeText={characterClass => this.setState({characterClass: characterClass})}
                        />
                        <TextInput
                            label='Klasa'
                            type="outlined"
                            style={{flex: 0.5}}
                            value={this.state.characterClass}
                            onChangeText={characterClass => this.setState({characterClass: characterClass})}
                        />
                    </View>
                    <View style={{ flexDirection:'row' }}>
                        <TextInput
                            label='Poziom'
                            type="outlined"
                            style={{flex: 0.5}}
                            value={this.state.characterClass}
                            onChangeText={characterClass => this.setState({characterClass: characterClass})}
                        />
                        <TextInput
                            label='charakter'
                            type="outlined"
                            style={{flex: 0.5}}
                            value={this.state.characterClass}
                            onChangeText={characterClass => this.setState({characterClass: characterClass})}
                        />
                        
                    </View>
                    <View style={{ flexDirection:'row' }}>
                        <TextInput
                            label='rasa'
                            type="outlined"
                            style={{flex: 0.5}}
                            value={this.state.characterClass}
                            onChangeText={characterClass => this.setState({characterClass: characterClass})}
                        />
                        <TextInput
                            label='pochodzenie'
                            type="outlined"
                            style={{flex: 0.5}}
                            value={this.state.characterClass}
                            onChangeText={characterClass => this.setState({characterClass: characterClass})}
                        />
                    </View>
                    </View>
                }
                {this.state.editModeEnabled === false &&
                            <View style={{height: 100}}>
                            <Text
                                style={styles.name}> {this.state.character.name}, {this.state.character.characterClass}  </Text>
                            <Text style={styles.name}> Poziom {this.state.character.level}</Text>
                            <Fab
                                containerStyle={{}}
                                style={styles.fab}
                                onPress={() => this.shareCharacterEvent(this.state.characterId)}
                            >
                                <View><Image source={Icons.charScreenIcons.share}/></View>
                            </Fab>
                        </View>
                }
                

                <Segment style={styles.segment}>
                    <Button
                        mode="outlined"
                        color="black"
                        style={styles.button}
                        onPress={() => this.setState({seg: 1})}
                    >
                        <Text style={styles.details}>Postać</Text>
                    </Button>
                    <Button
                        mode="outlined"
                        color="black"
                        style={styles.button}
                        onPress={() => this.setState({seg: 2})}
                    >
                        <Text style={styles.details}>Zdolności</Text>
                    </Button>
                    <Button
                        mode="outlined"
                        color="black"
                        style={styles.button}
                        onPress={() => this.setState({seg: 3})}
                    >
                        <Text style={styles.details}>Zaklęcia</Text>
                    </Button>
                </Segment>

                {this.state.editModeEnabled === true &&
                    <View>
                        {this.state.seg === 1 &&
                        <View style={{ flexDirection:'row' }}>
                            <TextInput
                                label='Sił'
                                type="outlined"
                                style={styles.tableInput}
                                value={this.state.characterClass}
                                onChangeText={characterClass => this.setState({characterClass: characterClass})}
                            />
                            <TextInput
                                label='Zre'
                                type="outlined"
                                style={styles.tableInput}
                                value={this.state.characterClass}
                                onChangeText={characterClass => this.setState({characterClass: characterClass})}
                            />
                            <TextInput
                                label='Kon'
                                type="outlined"
                                style={styles.tableInput}
                                value={this.state.characterClass}
                                onChangeText={characterClass => this.setState({characterClass: characterClass})}
                            />
                            <TextInput
                                label='Int'
                                type="outlined"
                                style={styles.tableInput}
                                value={this.state.characterClass}
                                onChangeText={characterClass => this.setState({characterClass: characterClass})}
                            />
                            <TextInput
                                label='Mdr'
                                type="outlined"
                                style={styles.tableInput}
                                value={this.state.characterClass}
                                onChangeText={characterClass => this.setState({characterClass: characterClass})}
                            />
                            <TextInput
                                label='Cha'
                                type="outlined"
                                style={styles.tableInput}
                                value={this.state.characterClass}
                                onChangeText={characterClass => this.setState({characterClass: characterClass})}
                            />
                        </View>
                        }
                    </View>
                }

                {this.state.editModeEnabled === false &&
                    <View>
                        {this.state.seg === 1 &&
                        <View>
                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.details}/>
                                <Rows data={this.state.statisticsTableData} textStyle={styles.details}/>
                            </Table>

                            <Text style={styles.details}>Premia z biegłości: {this.state.character.proficiency}</Text>
                            <Text style={styles.details}>Rzuty obronne</Text>

                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                <Rows data={this.state.proficiencyTableData} textStyle={styles.details}/>
                            </Table>

                            <Text> Umiejętności </Text>
                            
                            <FlatList
                            data={this.state.additionalSkillsWithValues}
                            renderItem={({item}) =>
                                <ListItem>
                                    <View>
                                        <Text style={styles.details}> {item}</Text>
                                    </View>
                                </ListItem>
                            }
                        />

                        </View>
                        }
                        {this.state.seg === 2 &&
                        <FlatList
                            data={this.state.character.skills}
                            renderItem={({item}) =>
                                <ListItem>
                                    <View style={styles.flatview}>
                                        <Text style={styles.details}> {item}</Text>
                                    </View>
                                </ListItem>
                            }
                        />
                        }
                        {this.state.seg === 3 &&
                        <FlatList
                            data={this.state.character.spells}
                            renderItem={({item}) =>
                                <ListItem>
                                    <View style={styles.flatview}>
                                        <Text style={styles.details}> {item}</Text>
                                    </View>
                                </ListItem>
                            }
                        />
                        }
                    </View>
                }

            {this.state.editModeEnabled === false &&
                <Fab
                    containerStyle={{}}
                    position="bottomRight"
                    style={{ backgroundColor: "#5067FF" }}
                    onPress={() => this.setState({editModeEnabled: true})}
                >
                    <View><Image source={Icons.charScreenIcons.share}/></View>
                </Fab>
             }
             {this.state.editModeEnabled === true &&
                <Fab
                    containerStyle={{}}
                    position="bottomRight"
                    style={{ backgroundColor: "#5067FF" }}
                    onPress={() => this.setState({editModeEnabled: false})}
                >
                    <View><Image source={Icons.charScreenIcons.share}/></View>
                </Fab>
             }
                
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    fab: {
        backgroundColor: "transparent", 
        elevation: 0,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    tableInput: {
        flex: Math.round((Dimensions.get('window').width)/6)
    },
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6},
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    flatview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 5,
        borderRadius: 2,
    },
    name: {
        fontFamily: 'Toms Handwritten',
        fontSize: 35
    },
    details: {
        fontFamily: 'Toms Handwritten',
        fontSize: 25
    },
    button: {
        width: Math.round( (Dimensions.get('window').width)/3),
        borderRadius: 5
    },
    segment: {
        backgroundColor: "white",
        marginLeft: 0,
        marginRight: 0,
    }
});