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

    addtoThisChar = (character, characterId) => {
        var a = character + characterId;
        Alert({character});
    }

    render(){
        return(
            <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={(data) =>
                <ListItem
                    onPress={() => addToThisChar(data.val(), data.key)}
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