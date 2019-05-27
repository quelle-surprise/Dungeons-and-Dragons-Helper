import React from 'react';
import { StyleSheet, Text, View, Image, Alert} from 'react-native';
import * as firebase from 'firebase';


export default class HeaderComponent extends React.Component {
  
  constructor(props) {
    super(props);
  }

  redirectToProfile() {
  }

  render() {
    return (
      <View style={styles.navbar}>
          <Text style={styles.text}>
                <Text style={{justifyContent: 'center'}}> {firebase.auth().currentUser.email} </Text>
                <Image  
                    style={{width: 50, height: 50}}
                    source={require('../../assets/user.png')}
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
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    flexDirection:'row',
    flexWrap:'wrap',
    paddingBottom: 20
  }
});