import React from "react";
import { StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode';

export default class ShareCharacterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          characterId: ""
        };
        const { navigation } = this.props;
        this.state.characterId = navigation.getParam('characterId', [""]);
      }

  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.text}> ID postaci </Text>
          <Text style={styles.smallerText}>{this.state.characterId}</Text>
          <View>
              <QRCode
                value={this.state.characterId}
                size={300}
                bgColor='black'
                fgColor='white'/>
          </View>
        </View>
    ) 
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    paddingTop: 20
},
  text: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: 'Toms Handwritten'
  },
  smallerText: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: 'Toms Handwritten'
  }
});