import * as React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';
// import * as firebase from "./character/CharacterAddScreen";
import * as firebase from 'firebase';

var data = [];

export default class BarcodeScannerScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            userId: "",
            listViewData: data
        };
    }

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.state.userId = user.uid;
            } else {
                console.log("User not logged in")
            }
        });
    }

    render() {
        const {hasCameraPermission, scanned} = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }

        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && (
                    <Button
                        title={'Naciśnij, żeby zeskanować jeszcze raz'}
                        onPress={() => this.setState({scanned: false})}
                    />
                )}
            </View>
        );
    }

    handleBarCodeScanned = ({data}) => {
        this.setState({scanned: true});
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({userId: user.uid});
                console.log(this.state.userId);
                this.addScannedCharacterToDatabase(data);

            } else {
                console.log("User not logged in")
            }
        });
    };

    async addScannedCharacterToDatabase(data) {
        try {
            this._data = data;
            console.log("Zeskanowany kod QR: " + this._data);
            let scannedQRCodeValues = this._data.split(',');
            await firebase.database().ref(scannedQRCodeValues[1] + '/characters/' + scannedQRCodeValues[0]).once('value')
                .then((data) => {
                    const userObj = data.val();
                    firebase.database().ref(this.state.userId + '/characters/').push({
                        additionalSkillsNames: userObj.additionalSkillsNames,
                        name: userObj.name,
                        characterClass: userObj.characterClass,
                        level: userObj.level,
                        char: userObj.char,
                        characterRace: userObj.characterRace,
                        provenance: userObj.provenance,
                        proficiency: userObj.proficiency,
                        strength: userObj.strength,
                        dexterity: userObj.dexterity,
                        condition: userObj.condition,
                        intelligence: userObj.intelligence,
                        wisdom: userObj.wisdom,
                        charisma: userObj.charisma,
                        additionalSkill: userObj.additionalSkill
                    }).then(() => {
                        console.log('successfully added to database')
                    }).catch(() => {
                      log('there were some problems during insertion ')
                    });
                   Alert.alert("Postać została pomyślnie przypisana do twojego konta.");
                });
        } catch (e) {
            alert("Something goes wrong while scanning character. " +
                "It's probably not visible in DB, please check and try again." +
                "Code error: " + e);
        }
    };
}