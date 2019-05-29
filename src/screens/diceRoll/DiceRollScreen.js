import React from 'react';
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity } from 'react-native';
import {Font} from "expo";
import RNShake from 'react-native-shake';
import Icons from "assets/icons";


  class DiceRollScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        multiplier: '',
        dice: ''
      };
    }

    async componentDidMount() {
      await Font.loadAsync({
          'Toms Handwritten': require('../../../assets/fonts/TomsHandwritten.ttf')
      });
      this.setState({fontLoaded: true});
  }

    componentWillMount() {
      RNShake.addEventListener('ShakeEvent', () => {
      if(this.state.dice || !this.state.multiplier || this.state.dice == 0){
      }
      else{
        () => {
              this.props.navigation.navigate('DiceRollResultScreen', {
                diceValue: this.state.dice,
                multiplierValue: this.state.multiplier,
              });
             }
      }
      });
    }
    
    render() {
        return (
         <View style={{ 
          flex: 1,
          alignItems:'center',
          justifyContent:'center'
         }}>
          <Image source={Icons.imagesIcons.diceImage} style={{width: 150, height: 150}}
          />
             <Text
             style={styles.buttonText}>
               {'Liczba kości'}
             </Text>
            <TextInput 
                style={styles.textInput}
                keyboardType='numeric'
                placeholder='0'
                onChangeText={(text)=> this.onChangedMulti(text)}
                value={this.state.multiplier}
                maxLength={1}
            />
            <Text
            style={styles.buttonText}>
                {'*\nLiczba ścianek na kości'}
            </Text>
            <TextInput
                style={styles.textInput} 
                keyboardType='numeric'
                placeholder='0'
                onChangeText={(text)=> this.onChangedDice(text)}
                value={this.state.dice}
                maxLength={2}
            />
            <TouchableOpacity
             disabled={!this.state.dice || !this.state.multiplier || this.state.dice == 0 }
             onPress={() => {
              this.props.navigation.navigate('DiceRollResultScreen', {
                diceValue: this.state.dice,
                multiplierValue: this.state.multiplier,
              });
             }}
             title='Losuj!'
             color='#841584'>
              <View 
              style={!this.state.dice || !this.state.multiplier || this.state.dice == 0 ? styles.buttonDis : styles.button}>
                <Text style={styles.buttonText}>Losuj!</Text>
              </View>
            </TouchableOpacity>
         </View> 
       );
       } //dodać shake'a i ograniczyć znowu tak jak buttona

    onChangedMulti(text){
        let newText = '';
        let numbers = '123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                alert('Proszę wpisywać tylko liczby od 1 do 9!');
            }
        }
        this.setState({ multiplier: newText });
    }    

    onChangedDice(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                alert('Proszę wpisywać tylko liczby!');
            }
        }
        this.setState({ dice: newText });
    }
  }
  
  export default DiceRollScreen;

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginBottom: 10,
        width: 140,
        height: 40,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1
    },
    buttonDis: {
      marginBottom: 10,
      width: 140,
      height: 40,
      alignItems: 'center',
      backgroundColor: 'gray',
      borderColor: 'black',
      borderWidth: 1
  },
    buttonText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 24,
        padding: 5,
        color: 'black',
        textAlign: 'center'
    },
    textInput: {
        fontFamily: 'Toms Handwritten',
        fontWeight: '400',
        color: 'black',
        borderBottomWidth: 25,
        borderColor: 'white',
        marginVertical: 10,
        padding: 10,
        height: 10,
        width: '15%',
        fontSize: 20,
        backgroundColor: 'white',
        textAlign: 'center'
    }
  });