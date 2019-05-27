import React from 'react';
import { StyleSheet, Text} from 'react-native';

export default class CharacterDisplayScreen extends React.Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true
    }

  render() {
    return (
         <Text> new screen </Text>
    )
}
}

const styles = StyleSheet.create({
});