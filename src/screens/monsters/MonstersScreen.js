import React, {PureComponent} from "react";
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import {ListItem, SearchBar} from "react-native-elements";
import {List} from "native-base";
import {Font} from "expo";


export default class MonstersScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false
        };
        this.arrayholder = [];
    }

    async componentDidMount() {
        this.fetchData();
        await Font.loadAsync({
            'Toms Handwritten': require('../../../assets/fonts/TomsHandwritten.ttf')
        });
        this.setState({fontLoaded: true});
    }

    fetchData = () => {

        const url = `http://www.dnd5eapi.co/api/monsters/`;

        this.setState({loading: true});

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.results,
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
                this.arrayholder = res.results;
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    backgroundColor: "black",
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar
            placeholder="Wprowadź nazwę potwora"
            lightTheme
            inputStyle={styles.textInput}
            onChangeText={text => this.searchFilterFunction(text)}
            value={this.state.value}
        />;
    };

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({data: newData});
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    render() {
        return (
            <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <ListItem
                            title={`${item.name}`}
                            titleStyle={styles.textInput}
                            iconRight
                            onPress={() => this.props.navigation.navigate('MonsterScreen', {
                                url: item.url
                            })
                            }
                        />
                    )}
                    keyExtractor={item => item.url}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                />
            </List>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'Toms Handwritten',
        color: 'black',
        fontSize: 30,
    },
});