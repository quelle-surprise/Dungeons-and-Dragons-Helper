import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, ScrollView} from 'react-native';


export default class FeatureScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loaded: true,
            error: null
        }
    }

    getData = () => {
        const {navigation} = this.props;
        const baseUrl = navigation.getParam('url');
        this.setState({loaded: false, error: null});
        fetch(baseUrl)
            .then(response => response.json())
            .then(this.showData)
            .catch(this.badStuff)
    };
    showData = (data) => {
        this.setState({loaded: true, data});
        console.log(data);
    };
    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
            )
        }
        return (
            <ScrollView style={styles.view}>
                <Text>{this.state.data.name}</Text>
                <Text>{this.state.data.level}</Text>

            </ScrollView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    view: {
        padding: 5,
    },
    largeText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 30,
        padding: 5,
        color: 'black',
        textAlign: 'left'
    },
    mediumText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 24,
        padding: 5,
        color: 'black',
        textAlign: 'left'
    },
    mediumBoldText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 25,
        fontWeight: '400',
        padding: 5,
        color: 'black',
        textAlign: 'left'
    },
    smallText:{
        fontFamily: 'Toms Handwritten',
        fontSize: 20,
        padding: 5,
        color: 'black',
        textAlign: 'left'
    }, 
    head: { height: 40, backgroundColor: '#f1f8ff' },
    details: {
        fontFamily: 'Toms Handwritten',
        fontSize: 25,
        textAlign: 'center',
      }
  });