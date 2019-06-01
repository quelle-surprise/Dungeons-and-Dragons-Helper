import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import Icons from "assets/icons";
import {Container, Content} from 'native-base'



export default class FeatureScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loaded: true,
            error: null
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Toms Handwritten': require('../../../assets/fonts/TomsHandwritten.ttf')
        });
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

    addCharacterEvent = () => {
        this.props.navigation.navigate('ChooseCharacterScreen', {
            name: this.state.data.name, 
            type: 2
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
            )
        }

        var className = '';
        if (typeof this.state.data.class !== 'undefined') {
            className = this.state.data.class.name;
        }

        return (
            <Container style={styles.container}>
            <Content>
            <ScrollView style={styles.view}>
                <Text style={styles.largeText}>
                    Nazwa: {this.state.data.name}
                </Text>
                <Text style={styles.smallText}>
                    Poziom: {this.state.data.level} {"\n"}
                    Klasa: {className} {"\n"}
                </Text>
                <Text>
                    <Text style={styles.mediumBoldText}>Opis: </Text>
                    <Text style={styles.smallText}>{this.state.data.desc}</Text>
                </Text>
            </ScrollView>
            </Content>
                <TouchableOpacity activeOpacity={0.5} 
                                  onPress={() => this.addCharacterEvent()}
                                  style={styles.TouchableOpacityStyle}>
                    <Image source={Icons.charScreenIcons.plus} style={styles.FloatingButtonStyle}/>
                </TouchableOpacity>

            </Container>
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
    smallText: {
        fontFamily: 'Toms Handwritten',
        fontSize: 20,
        padding: 5,
        color: 'black',
        textAlign: 'left'
    },
    head: {height: 40, backgroundColor: '#f1f8ff'},
    details: {
        fontFamily: 'Toms Handwritten',
        fontSize: 25,
        textAlign: 'center',
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
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',

    },
});