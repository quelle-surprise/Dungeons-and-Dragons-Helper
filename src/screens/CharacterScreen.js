import React from 'react';
import { StyleSheet, Text, View, ListView, Image, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { Container, Content, ListItem, List  } from 'native-base'
import * as firebase from 'firebase';
import Icons from "assets/icons";
var data = []

export default class CharacterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        listViewData: data,
        newContact: "",
        dataLoaded: false
        }
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }

    async componentDidMount() {
        var that = this
        firebase.database().ref('characters/').on('child_added', function (data) {
        var newData = [...that.state.listViewData]
        newData.push(data)
        that.setState({ listViewData: newData })
        })

        await Expo.Font.loadAsync({
            'Toms Handwritten': require('../../assets/fonts/TomsHandwritten.ttf')
        });
        this.setState({dataLoaded: true});
    }

    async deleteRow(secId, rowId, rowMap, data) {
        await firebase.database().ref('characters/' + data.key).set(null)
        rowMap[`${secId}${rowId}`].props.closeRow();
        var newData = [...this.state.listViewData];
        newData.splice(rowId, 1)
        this.setState({ listViewData: newData });
    }


    FloatingButtonEvent=()=>{
      Alert.alert("Doesnt work")
    }

    characterClickEvent=(character, characterId)=>{
      this.props.navigation.navigate('CharacterDisplayScreen', {
        character: character,
        characterId: characterId
      });
    }

    shareCharacterEvent=(chadacterId)=>{
      this.props.navigation.navigate('ShareCharacterScreen', {
        characterId: chadacterId,
      });
    }
  

    characterLongPress=(secId, rowId, rowMap, data)=>{
      Alert.alert(
        'Wybierz akcje',
        'Możliwe opcje do wyboru:',
        [
          {text: 'Powrót', onPress: () => console.log('Return')},
          {text: 'Usuń postać', onPress: () => this.makeSure(secId, rowId, rowMap, data)},
          {text: 'Udostępnij postać', onPress: () =>  this.shareCharacterEvent(data.key)}
        ],
        {cancelable: true}
      )
    }

    makeSure=(secId, rowId, rowMap, data)=>{
      Alert.alert(
        'Jesteś pewien',
        'Czy na pewno chcesz usunać postać?',
        [
          {text: 'Tak', onPress: () => this.deleteRow(secId, rowId, rowMap, data)},
          {text: 'Nie', onPress: () => console.log("Return")}
        ],
        {cancelable: true}
      )
    }
  
  render() {
    if (this.state.dataLoaded) {
    return (
      <Container style={styles.container}>
        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={(data, secId, rowId, rowMap) =>
              <ListItem 
              onPress={() => this.characterClickEvent(data.val(), data.key)}
              onLongPress={() => this.characterLongPress(secId, rowId, rowMap, data)}
              >
               <View style={styles.flatview}>
                    <Image  
                        style={{width: 50, height: 50}}
                        source={Icons.charScreenIcons.characterIcon}
                    />
                    <Text style={styles.details}> {data.val().name},</Text>
                    <Text style={styles.details}> {data.val().characterClass} poziomu {data.val().level}</Text>
                </View>
              </ListItem>
            }
            renderLeftHiddenRow={() => {}}
            leftOpenValue={0}
          />
        </Content>

         <TouchableOpacity activeOpacity={0.5} onPress={this.FloatingButtonEvent} style={styles.TouchableOpacityStyle} >
           <Image source={Icons.charScreenIcons.plus}  style={styles.FloatingButtonStyle} />
         </TouchableOpacity>

      </Container>
      );
  } else {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large"/>
        </View>
    )
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',

  },
  wrapper: {
    paddingTop: 50,
    backgroundColor: "gray",
    flex: 1
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 500,
    width: 300
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
  flatview: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Toms Handwritten',
    fontSize: 35
  },
  details: {
    fontSize: 33,
    fontFamily: 'Toms Handwritten'
  }
});