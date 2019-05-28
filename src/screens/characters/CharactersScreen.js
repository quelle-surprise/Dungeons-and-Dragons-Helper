import React, { Component } from "react";
import { View, Text } from 'react-native';

class CharactersScreen extends Component {
    constructor (props){
        super (props);
    }

    render() {
        return (
            <View>
                <Text>
                    Select your character!
                </Text>
            </View>
        );
    }
}

export default CharactersScreen;