import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Font} from "expo";
import Icons from "assets/icons";

class DiceRollResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiplier: 0,
            dice: 0,
            result: 0,
            data: [],
            round: 0,
            error: null,
            refreshing: false
        };
        const {navigation} = this.props;
        this.state.multiplier = navigation.getParam('multiplierValue', 0);
        this.state.dice = navigation.getParam('diceValue', 0);
        for (this.state.round; this.state.round < this.state.multiplier; this.state.round++) {
            var RandomNumber = Math.floor(Math.random() * this.state.dice) + 1;
            this.state.result += RandomNumber;
            var element = {};
            element.ID = this.state.round;
            element.Val = RandomNumber;
            this.state.data.push({element})
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Toms Handwritten': require('../../../assets/fonts/TomsHandwritten.ttf')
        });
        this.setState({fontLoaded: true});
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <View style={{paddingTop: 15}} />  
                <Image source={Icons.imagesIcons.diceRollImage} style={{width: 200, height: 100}}/>
                <Text style={styles.buttonText}>
                    Suma rzutów: {this.state.result}
                </Text>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => <Text
                        style={styles.buttonText}>{item.element.ID + 1}. {item.element.Val}</Text>}
                />
            </View>
        );
    }

}


export default DiceRollResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginBottom: 10,
        width: 140,
        height: 40,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1
    },
    buttonText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 24,
        padding: 5,
        color: 'black',
        textAlign: 'center'
    },
    textInput: {
        fontFamily: 'Toms Handwritten',
        fontWeight: '400',
        color: 'black',
        borderBottomWidth: 25,
        borderColor: 'white',
        marginVertical: 10,
        padding: 10,
        height: 10,
        width: '15%',
        fontSize: 20,
        backgroundColor: 'white',
        textAlign: 'center'
    }
});