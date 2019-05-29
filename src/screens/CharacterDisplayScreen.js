import React from "react";
import { StyleSheet, Text, Alert, FlatList } from 'react-native';
import { ListItem } from 'native-base'
import { Table, Row, Rows } from 'react-native-table-component';
import {
  Container,
  Fab,
  IconNB,
  View,
  Segment,
  Button,
} from "native-base";

export default class CharacterDisplayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      character: [],
      seg: 1,
      tableHead: ['Str', 'Agility', 'Stamina', 'Int', 'Know', 'Char'],
      statisticsTableData: [],
      proficiencyTableData: []
    };
    const { navigation } = this.props;
    this.state.character = navigation.getParam('character', [""]);
    console.disableYellowBox = true
    this.generateStatisticsTable()
  }

  componentDidMount(){
    
  }

  generateStatisticsTable=()=>{
    let character = this.state.character
    let statistics = [
      character.strength, character.agility,
      character.condition,character.intelligence,
      character.knowledge,character.charisma]
    this.generateTableWithModifiersRow(statistics)
  }

  generateTableWithModifiersRow = (statistics) => {
    let modifiers = []
    statistics.forEach(stat => {
      modifiers.push(Math.floor((stat-10)/2))
    });
    this.state.statisticsTableData = [statistics,modifiers]
    this.generateProficiencyTable(modifiers)
  }

  generateProficiencyTable = (modifiers) => {
    let proficiency = []
    modifiers.forEach(modifier => {
      proficiency.push(modifier + this.state.character.proficiency)
    });
    this.state.proficiencyTableData.push(proficiency)
  }

  render() {
      return (
      <Container style={styles.container}>

          <View style={{height: 100}}>
          <Text style={styles.name}> {this.state.character.name}, {this.state.character.characterClass}  </Text>
          <Text style={styles.name}> Poziom {this.state.character.level}</Text>
              <Fab
                containerStyle={{}}
                style={{ backgroundColor: "#5067FF" }}
                position="topRight"
                onPress={() => Alert.alert("Test")}
              >
                <IconNB name="md-share" />
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
              <Rows data={this.state.statisticsTableData} textStyle={styles.details}/>
            </Table>

            <Text style={styles.details}>Premia z biegłości: {this.state.character.proficiency}</Text>
            <Text style={styles.details}>Rzuty obronne</Text>

            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Rows data={this.state.proficiencyTableData} textStyle={styles.details}/>
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