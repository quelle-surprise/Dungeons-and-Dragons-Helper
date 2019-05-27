import React, { PureComponent } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import {ListItem, SearchBar } from "react-native-elements";
import { List } from "native-base";


export default class FeaturesScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {

        const url = `http://www.dnd5eapi.co/api/features/`;

        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.results,
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "black",
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
    };

    render() {
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            title={`${item.name}`}
                            subtitle={item.url}
                            iconRight
                            onPress = {() => this.props.navigation.navigate('FeatureScreen')}
                        />
                    )}
                    keyExtractor={item => item.url}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </List>
        );
    }
}
