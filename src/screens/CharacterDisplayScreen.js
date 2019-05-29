import React, { Component } from "react";
import { StyleSheet, Text, ListView, Image, Alert, ActivityIndicator, FlatList } from 'react-native';
import { ListItem } from 'native-base'
import { Table, Row, Rows } from 'react-native-table-component';
import {
  Container,
  Fab,
  IconNB,
  Left,
  Right,
  View,
  Segment,
  Button,
  List
} from "native-base";
import Icons from "assets/icons";

export default class CharacterDisplayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      character: [],
      seg: 1,
      tableHead: ['Str', 'Agility', 'Stamina', 'Int', 'Know', 'Char'],
      tableData: [],
      proficiencyData: []
    };
    const { navigation } = this.props;
    this.state.character = navigation.getParam('character', [""]);
    console.disableYellowBox = true
    this.generateStatisticsList()
  }

    generateStatisticsList=()=>{
    let character = this.state.character
    let statisticsList = []
    statisticsList.push(character.strength)
    statisticsList.push(character.agility)
    statisticsList.push(character.condition)
    statisticsList.push(character.intelligence)
    statisticsList.push(character.knowledge)
    statisticsList.push(character.charisma)
    this.generateTableWithModifiers(statisticsList)
  }

  generateTableWithModifiers = (statisticsList) => {
    let table = []
    let modifiersList = []
    statisticsList.forEach(element => {
      modifiersList.push(Math.floor((element-10)/2))
    });
    table.push(statisticsList)
    table.push(modifiersList)
    this.state.tableData = table
    this.generateProficiencyTable(modifiersList)
  }

  generateProficiencyTable = (modifiersList) => {
    let proficiencyList = []
    modifiersList.forEach(element => {
      proficiencyList.push(element+this.state.character.proficiency)
    });
    console.log('prof list' + proficiencyList)
    this.state.proficiencyData.push(proficiencyList)
  }
  render() {
      return (
      <Container style={styles.container}>

          <View style={{height: 100}}>
          <Text style={styles.name}> {this.state.character.name}, {this.state.character.characterClass}  </Text>
          <Text style={styles.name}> Poziom {this.state.character.level}</Text>
              <Fab
                containerStyle={{}}
                style={{ backgroundColor: "transparent", elevation: 0 }}
                position="topRight"
                onPress={() => Alert.alert("Test")}
              >
                {/* <IconNB name="md-share" /> */}
                <View><Image source={Icons.charScreenIcons.share} /></View>                
              </Fab>
            </View>
            
            <Segment style={styles.segment}>
            <Button
              bordered
              style={styles.button}
              active={this.state.seg === 1 ? true : false}
              first
              onPress={() => this.setState({ seg: 1 })}
            >
              <Text style={styles.details} >Postać</Text>
            </Button>
            <Button
              bordered
              style={styles.button}
              active={this.state.seg === 2 ? true : false}
              onPress={() => this.setState({ seg: 2 })}
            >
              <Text style={styles.details}>Zdolności</Text>
            </Button>
            <Button
              bordered
              style={styles.button}
              active={this.state.seg === 3 ? true : false}
              last
              onPress={() => this.setState({ seg: 3 })}
            >
              <Text style={styles.details}>Zaklęcia</Text>
            </Button>
            <Button
              bordered
              style={styles.button}
              active={this.state.seg === 4 ? true : false}
              last
              onPress={() => this.setState({ seg: 4 })}
            >
              <Text style={styles.details}>Umiejętności</Text>
            </Button>
        </Segment>


        {this.state.seg === 1 && 
          <View>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.details}/>
              <Rows data={this.state.tableData} textStyle={styles.details}/>
            </Table>

            <Text style={styles.details}>Premia z biegłości: {this.state.character.proficiency}</Text>
            <Text style={styles.details}>Rzuty obronne</Text>

            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Rows data={this.state.proficiencyData} textStyle={styles.details}/>
            </Table>
          </View>
        }
        {this.state.seg === 2 && 
          <FlatList
          data = {this.state.character.skills}
          renderItem={({item}) => 
          <ListItem onPress={() => Alert.alert("Clicked on " + item)}>
          <View style={styles.flatview}>
               <Text style={styles.details}> {item}</Text>
           </View>
         </ListItem>
        }
        />
        }
        {this.state.seg === 3 && 
          <FlatList
          data = {this.state.character.spells}
          renderItem={({item}) => 
          <ListItem onPress={() => Alert.alert("Clicked on " + item)}>
          <View style={styles.flatview}>
               <Text style={styles.details}> {item}</Text>
           </View>
         </ListItem>
        }
        />
        }
        {this.state.seg === 4 && 
          <Text> Umiejętności </Text>
        }
      </Container>
      
    ) 
}
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
    fontFamily: 'Toms Handwritten',
    fontSize: 25
  },
  button: {
    flex: 0.25,
    borderRadius:5
  },
  segment: {
     backgroundColor: "white",
     marginLeft: 0, 
     marginRight:0,
  }
});