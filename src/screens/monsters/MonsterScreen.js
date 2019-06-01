import React from 'react';
import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Row, Table} from 'react-native-table-component';
import {ListItem} from 'react-native-elements';


export default class MonsterScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loaded: true,
            error: null,
            tableHead: ['Str', 'Dex', 'Cons', 'Int', 'Wis', 'Cha'],
            tableData: ['', '', '', '', '', '']
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Toms Handwritten': require('../../../assets/fonts/TomsHandwritten.ttf')
        });
    }

    getData = () => {
        const {navigation} = this.props;
        const baseUrl = navigation.getParam('url');
        this.setState({loaded: false, error: null});
        fetch(baseUrl)
            .then(response => response.json())
            .then(this.showData)
            .catch(this.badStuff)
    };
    showData = (data) => {
        this.setState({loaded: true, data});
        console.log(data);
    };
    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
            )
        }
        this.state.tableData[0] = this.state.data.strength;
        this.state.tableData[1] = this.state.data.dexterity;
        this.state.tableData[2] = this.state.data.constitution;
        this.state.tableData[3] = this.state.data.intelligence;
        this.state.tableData[4] = this.state.data.wisdom;
        this.state.tableData[5] = this.state.data.charisma;
        return (
            <ScrollView style={styles.view}>
                <Text style={styles.largeText}>
                    Nazwa: {this.state.data.name} {"\n"}
                </Text>
                <Text style={styles.smallText}>
                    Wielkość: {this.state.data.size}{"\n"}
                    Typ: {this.state.data.type}, Podtyp: {this.state.data.subtype}{"\n"}
                    Charakter: {this.state.data.alignment}{"\n"}
                    AC: {this.state.data.armor_class}, HP: {this.state.data.hit_points}, Kość
                    HP: {this.state.data.hit_dice}{"\n"}
                    Prędkość: {this.state.data.speed}{"\n"}
                </Text>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.details}/>
                    <Row data={this.state.tableData} textStyle={styles.details}/>
                </Table>
                <Text style={styles.mediumText}> Akcje: </Text>
                <FlatList
                    data={this.state.data.actions}
                    renderItem={({item}) =>
                        <ListItem
                            subtitleStyle={styles.smallText}
                            titleStyle={styles.mediumText}
                            title={item.name}
                            subtitle={item.desc}/>}
                />
                <Text style={styles.mediumText}> Specjalne umiejętności: </Text>
                <FlatList
                    data={this.state.data.special_abilities}
                    renderItem={({item}) =>
                        <ListItem
                            subtitleStyle={styles.smallText}
                            titleStyle={styles.mediumText}
                            title={item.name}
                            subtitle={item.desc}/>}
                />
                <Text style={styles.mediumText}> Legendarne akcje:</Text>
                <FlatList
                    data={this.state.data.legendary_actions}
                    renderItem={({item}) =>
                        <ListItem
                            subtitleStyle={styles.smallText}
                            titleStyle={styles.mediumText}
                            title={item.name}
                            subtitle={item.desc}/>}
                />
            </ScrollView>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    view: {
        padding: 5,
    },
    largeText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 30,
        padding: 5,
        color: 'black',
        textAlign: 'left'
    },
    mediumText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 24,
        padding: 5,
        color: 'black',
        textAlign: 'left'
    },
    smallText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 20,
        padding: 5,
        color: 'black',
        textAlign: 'left'
    },
    head: {height: 40, backgroundColor: '#f1f8ff'},
    details: {
        fontFamily: 'Toms Handwritten',
        fontSize: 25,
        textAlign: 'center',
    }
});