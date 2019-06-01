import React from 'react';
import {Image, Text, View, ListView, StyleSheet, ActivityIndicator, Alert, TouchableOpacity} from 'react-native';
import {Font} from "expo";
import {List, ListItem, Content, Container} from 'native-base'
import * as firebase from 'firebase';
import Icons from "assets/icons";

var data = [];

class ChooseCharacterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            listViewData: data,
            dataLoaded: false,
            userId: "",
            name: "",
            type: 0,
        };
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        const {navigation} = this.props;
        this.state.name = navigation.getParam('name', '-');
        this.state.type = navigation.getParam('type', 0);
    }

    async componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.state.userId = user.uid;
                this.getDataFromDatabase(user.uid)
            } else {
                console.log("User not logged in")
            }
        });

        await Font.loadAsync({
            'Toms Handwritten': require('../../../assets/fonts/TomsHandwritten.ttf')
        });
        this.setState({fontLoaded: true});
    }

    getDataFromDatabase(userId) {
        var that = this;
        firebase.database().ref(userId + '/characters/').on('child_added', function (data) {
            var newData = [...that.state.listViewData];
            newData.push(data);
            that.setState({listViewData: newData})
        });
    }

    addToThisChar = (character, characterId, userId, name, type) => {
        var skillsOrFeatures = '';
        var finded = false, zeroValued = false;
        var spellsResults = character.spells;
        var skillsResults = character.skills;

        if(type == 1){
            spellsResults.forEach(element => {
                if(element == name){
                    finded = true;
                };
            });
            skillsOrFeatures = '/spells/';
            spellsResults.push(name);
            if(character.spells[0] == ' '){
                zeroValued = true;
            }
        }

        else{
            skillsResults.forEach(element => {
                if(element == name){
                    finded = true;
                };
            });
            skillsOrFeatures = '/skills/';
            skillsResults.push(name);
            if(character.skills[0] == ' '){
                zeroValued = true;
            }
        }

        if(finded == false){
            if(zeroValued){
                firebase.database().ref(userId + '/characters/' + characterId + skillsOrFeatures).update({
                    0: name
            });
            }
            else{
                firebase.database().ref(userId + '/characters/' + characterId + '/').update({
                    spells : spellsResults,
                    skills : skillsResults
            });
            }

            this.props.navigation.goBack();
            Alert.alert("Dodano do postaci.");
        }
        else{
            Alert.alert("Ta postać już się tego nauczyła.");
        }

    }
    

    render(){
        return(
            <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={(data) =>
                <ListItem
                    onPress={() => this.addToThisChar(data.val(), data.key, this.state.userId, this.state.name, this.state.type)}
                >
                    <View style={styles.flatview}>
                        <Image
                            style={{width: 50, height: 50}}
                            source={Icons.charScreenIcons.characterIcon}
                        />
                        <Text style={styles.details}> {data.val().name},</Text>
                        <Text
                            style={styles.details}> {data.val().characterClass} poziomu {data.val().level}</Text>
                    </View>
                </ListItem>
            }
            renderLeftHiddenRow={() => {
            }}
            leftOpenValue={0}
        />
        )
    }
}

export default ChooseCharacterScreen;

const styles = StyleSheet.create({
    flatview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 5,
        borderRadius: 2,
    },
    details: {
        fontSize: 33,
        fontFamily: 'Toms Handwritten'
    }
});