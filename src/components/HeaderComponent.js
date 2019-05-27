import React from 'react';
import { StyleSheet, Text, View, Image, Alert} from 'react-native';
import * as firebase from 'firebase';


export default class HeaderComponent extends React.Component {
  
  constructor(props) {
    super(props);
  }

  redirectToProfile() {
    Alert.alert("This should redirect to character creation");
  }

  render() {
    return (
      <View style={styles.navbar}>
        <View style={styles.rightContainer}>
          <Text style={styles.text} onPress={() => this.redirectToProfile()}>
                <Text style={{justifyContent: 'center'}}> {firebase.auth().currentUser.email} </Text>
                <Image  
                    style={{width: 50, height: 50}}
                    source={require('../../assets/user.png')}
                />
            </Text>  
        </View>              
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    height: 70,
  },
  text: {
    fontSize: 18,
    flexDirection:'row',
    flexWrap:'wrap',
    paddingBottom: 20
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});