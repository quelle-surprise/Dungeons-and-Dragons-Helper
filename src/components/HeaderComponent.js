import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import * as firebase from 'firebase';
import Icons from "assets/icons";


export default class HeaderComponent extends React.Component {
  
  constructor(props) {
    super(props);
  }

  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}

  render() {
    return (

      <View style={styles.navbar}>
          <TouchableOpacity style={styles.alignLeft} onPress={() => this.signOutUser()}>
            <ImageBackground source={Icons.buttonIcons.buttonLight} style={{width: 143, height: 40}}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Wyloguj</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <Text style={styles.text}>
                <Text style={{justifyContent: 'center'}}> {firebase.auth().currentUser.email} </Text>
                <Image  
                    style={{width: 50, height: 50}}
                    source={Icons.charScreenIcons.userIcon}
                />
            </Text>            
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    borderBottomColor: 'black',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5
  },
  text: {
    fontSize: 25,
    flexDirection:'row',
    flexWrap:'wrap',
    fontFamily: 'Toms Handwritten',
    paddingBottom: 20
  },
  alignLeft: {
    flex: 1,
    marginTop: 15
  },
  button: {
    width: 140,
    height: 35,
    alignItems: 'center'
},
buttonText: {
    fontFamily: 'Toms Handwritten',
    fontSize: 24,
    padding: 5,
    color: 'black',
    alignItems: 'center'
},
});