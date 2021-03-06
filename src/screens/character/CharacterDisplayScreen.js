import Icons from "assets/icons";
import {Container, Fab, ListItem, Segment, View} from 'native-base';
import React from "react";
import {Dimensions, FlatList, Image, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {Row, Rows, Table} from 'react-native-table-component';

var deviceHeight = Math.round(Dimensions.get('window').height)
var topDataHeight = 508

export default class CharacterDisplayScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            characterId: "",
            character: [],
            seg: 1,
            editModeEnabled: false,
            tableHead: ['Sił', 'Zrę', 'Kon', 'Int', 'Mdr', 'Char'],
            additionalSkillsNames: [
                "Akrobatyka", "Arkana", "Atletyka", "Empatia", "Historia", "Medycyna", "Natura", "Opieka nad zwierzętami", "Oszustwo",
                "Perswazja", "Religia", "Skradanie", "Spostrzegawczość", "Sztuka przetrwania", "Śledztwo", "Występy", "Zastraszanie", "Zwinne palce"],
            additionalSkillsStat: [
                "dexterity", "intelligence", "strength", "wisdom", "intelligence", "wisdom", "intelligence", "wisdom", "charisma",
                "charisma", "intelligence", "dexterity", "wisdom", "wisdom", "intelligence", "charisma", "charisma", "dexterity"],
            additionalSkillsWithValues: [],
            statisticsTableData: [],
            proficiencyTableData: [],
            userId: ""
        };
        const {navigation} = this.props;
        this.state.character = navigation.getParam('character', [""]);
        this.state.characterId = navigation.getParam('characterId', "");
        this.state.userId = navigation.getParam('userId', "");
        this.generateStatisticsTable();
        this.generateAdditionalSkillsList(this.state.additionalSkillsStat,
            this.state.character.proficiency, this.state.additionalSkillsNames)
    }

    shareCharacterEvent = (chadacterId) => {
        this.props.navigation.navigate('ShareCharacterScreen', {
            characterId: chadacterId,
            userId: this.state.userId
        });
    };

    editCharacterevent = () => {
        this.props.navigation.navigate('CharacterAddScreen', {
            character: this.state.character,
            userId: this.state.userId,
            charId: this.state.characterId,
            type: 2
        });
    };

    generateAdditionalSkillsList = (statistics, proficiency, names) => {
        let tab = [];
        statistics.forEach((stat, index) => {
            switch (stat) {
                case "dexterity":
                    tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.dexterity, proficiency, names[index]));
                    break;
                case "intelligence":
                    tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.intelligence, proficiency, names[index]));
                    break;
                case "strength":
                    tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.strength, proficiency, names[index]));
                    break;
                case "wisdom":
                    tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.wisdom, proficiency, names[index]));
                    break;
                case "charisma":
                    tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.charisma, proficiency, names[index]));
                    break;
                case "condition":
                    tab.push(this.chekProficiency(this.state.character.additionalSkill[index],
                        this.state.character.condition, proficiency, names[index]));
                    break
            }
        });
        this.state.additionalSkillsWithValues = tab
    };

    chekProficiency = (addProficiency, statvalue, proficiency, statname) => {
        if (addProficiency == true) {
            return ((Number(statvalue) + Number(proficiency)) + " " + statname)
        } else
            return (statvalue + " " + statname)
    };

    generateStatisticsTable = () => {
        let character = this.state.character;
        let statistics = [
            character.strength, character.dexterity,
            character.condition, character.intelligence,
            character.wisdom, character.charisma];
        this.generateTableWithModifiersRow(statistics)
    };

    generateTableWithModifiersRow = (statistics) => {
        let modifiers = [];
        statistics.forEach(stat => {
            modifiers.push(Math.floor((stat - 10) / 2))
        });
        this.state.statisticsTableData = [statistics, modifiers];
        this.generateProficiencyTable(modifiers)
    };

    generateProficiencyTable = (modifiers) => {
        let proficiency = [];
        modifiers.forEach(modifier => {
            proficiency.push(Number(modifier) + Number(this.state.character.proficiency))
        });
        this.state.proficiencyTableData.push(proficiency)
    };


    render() {
        return (
            <Container style={styles.container}>

                <View style={{height: 150}}>
                    <Text
                        style={styles.name}> {this.state.character.name}, {this.state.character.characterClass}  </Text>
                    <Text style={styles.name}> Poziom: {this.state.character.level}</Text>
                    <Text style={styles.name}> {this.state.character.char}, {this.state.character.characterRace}, {this.state.character.provenance}</Text>
                    <Fab
                        containerStyle={{}}
                        style={styles.fab}
                        onPress={() => this.shareCharacterEvent(this.state.characterId)}
                    >
                        <View><Image source={Icons.charScreenIcons.share}/></View>
                    </Fab>
                </View>

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

                <View>
                    {this.state.seg === 1 &&
                    <View>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#282828'}}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.detailsTable}/>
                            <Rows data={this.state.statisticsTableData} textStyle={styles.detailsTable}/>
                        </Table>

                        <Text style={styles.details}>Premia z biegłości: {this.state.character.proficiency}</Text>
                        <Text style={styles.details}>Rzuty obronne</Text>

                        <Table borderStyle={{borderWidth: 2, borderColor: '#282828'}}>
                            <Rows data={this.state.proficiencyTableData} textStyle={styles.detailsTable}/>
                        </Table>

                        <Text style={styles.details}> Umiejętności </Text>
                        <View style={{height: deviceHeight - topDataHeight}}>
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

                <Fab
                    containerStyle={{}}
                    position="bottomRight"
                    style={styles.fabEdit}
                    onPress={() => {
                        this.setState({editModeEnabled: true});
                        this.editCharacterevent()
                    }}
                >
                    <View><Image source={Icons.charScreenIcons.edit}/></View>
                </Fab>
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
    fabEdit: {
        backgroundColor: "transparent",
        elevation: 0,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
    tableInput: {
        flex: Math.round((Dimensions.get('window').width) / 6)
    },
    head: {height: 40, backgroundColor: '#bababa'},
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
    detailsTable: {
        fontFamily: 'Toms Handwritten',
        fontSize: 25,
        textAlign: 'center'
    },
    button: {
        width: Math.round((Dimensions.get('window').width) / 3),
        borderRadius: 5
    },
    segment: {
        backgroundColor: "white",
        marginLeft: 0,
        marginRight: 0,
    }
});