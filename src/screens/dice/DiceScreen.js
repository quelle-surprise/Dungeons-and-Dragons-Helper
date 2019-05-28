import React, { Component } from "react";
import { View, Text } from 'react-native';

class DiceScreen extends Component {
    constructor (props){
        super (props);
    }

    render() {
        return (
            <View>
                <Text>
                    Dice roll!
                </Text>
            </View>
        );
    }
}

export default DiceScreen;