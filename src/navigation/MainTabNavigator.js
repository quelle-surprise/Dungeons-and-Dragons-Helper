// // import React from 'react';
// // import TestScreen from '../screens/TestScreen';
// //
// // export default TabNavigator(
// //     {
// //         Test: {
// //             screen: TestScreen,
// //         },
// //     },
// // );
// import React, {PureComponent} from "react";
// import {ActivityIndicator, FlatList, View} from "react-native";
// import {ListItem, SearchBar} from "react-native-elements";
// import {List} from 'native-base';
//
// class SkillsScreen extends PureComponent {
//
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             loading: false,
//             data: [],
//             error: null,
//             refreshing: false
//         };
//     }
//
//     componentDidMount() {
//         this.makeRemoteRequest();
//     }
//
//     makeRemoteRequest = () => {
//         const url = 'http://www.dnd5eapi.co/api/spells/';
//         this.setState({loading: true});
//
//         fetch(url)
//             .then(res => res.json())
//             .then(res => {
//                 this.setState({
//                     error: res.error || null,
//                     loading: false,
//                     refreshing: false
//                 });
//                 console.log(res.json());
//             })
//             .catch(error => {
//                 this.setState({error, loading: false});
//             });
//
//     };
//
//     renderSeparator = () => {
//         return (
//             <View
//                 style={{
//                     height: 1,
//                     width: "86%",
//                     backgroundColor: "#CED0CE",
//                     marginLeft: "14%"
//                 }}
//             />
//         );
//     };
//
//     renderHeader = () => {
//         return <SearchBar placeholder="Type Here..." lightTheme round/>;
//     };
//
//     renderFooter = () => {
//         if (!this.state.loading) return null;
//
//         return (
//             <View
//                 style={{
//                     paddingVertical: 20,
//                     borderTopWidth: 1,
//                     borderColor: "#CED0CE"
//                 }}
//             >
//                 <ActivityIndicator animating size="large"/>
//             </View>
//         );
//     };
//
//     render() {
//         return (
//             <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
//                 <FlatList
//                     data={this.state.data}
//                     renderItem={({item}) => (
//                         <ListItem
//                             roundAvatar
//                             title={`${item.name}`}
//                             containerStyle={{borderBottomWidth: 0}}
//                         />
//                     )}
//                     keyExtractor={item => item.url}
//                     ItemSeparatorComponent={this.renderSeparator}
//                     // ListHeaderComponent={this.renderHeader}
//                     ListFooterComponent={this.renderFooter}
//                     refreshing={this.state.refreshing}
//                     onEndReachedThreshold={50}
//                 />
//             </List>
//         );
//     }
// }
//
// export default SkillsScreen;