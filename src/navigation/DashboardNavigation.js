import React from 'react';
import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import FeaturesScreen from "../screens/features/FeaturesScreen";
import FeatureScreen from "../screens/features/FeatureScreen";
import CharacterScreen from '../screens/character/CharacterScreen';
import MonstersScreen from "../screens/monsters/MonstersScreen";
import RollDiceScreen from "../screens/diceRoll/DiceRollScreen";
import DiceRollResultScreen from "../screens/diceRoll/DiceRollResultScreen";
import CharacterDisplayScreen from "../screens/character/CharacterDisplayScreen";
import CharacterAddScreen from "../screens/character/CharacterAddScreen";
import ShareCharacterScreen from "../screens/character/ShareCharacterScreen";
import SpellsScreen from "../screens/spells/SpellsScreen";
import Icons from "assets/icons";
import {Image} from "react-native";
import HeaderComponent from '../components/HeaderComponent';
import SettingsScreen from "../screens/SettingsScreen";
import MonsterScreen from "../screens/monsters/MonsterScreen";
import SpellScreen from "../screens/spells/SpellScreen";
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";

const DashboardTabNavigator = createMaterialTopTabNavigator({
        CharacterScreen: {
            screen: CharacterScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return (
                        <Image
                            source={Icons.bottomTabNavigatorIcons.chars}
                        />
                    );
                }
            }
        },
        RollDiceScreen: {
            screen: RollDiceScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return (
                        <Image
                            source={Icons.bottomTabNavigatorIcons.dice}
                        />
                    );
                }
            }
        },
        FeaturesScreen: {
            screen: FeaturesScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return (
                        <Image
                            source={Icons.bottomTabNavigatorIcons.skills}
                        />
                    );
                }
            }
        },
        SpellsScreen: {
            screen: SpellsScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return (
                        <Image
                            source={Icons.bottomTabNavigatorIcons.spells}
                        />
                    );
                }
            }
        },
        MonstersScreen: {
            screen: MonstersScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return (
                        <Image
                            source={Icons.bottomTabNavigatorIcons.monsters}
                        />
                    );
                }
            }
        },
        BarcodeScannerScreen: {
            screen: BarcodeScannerScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return (
                        <Image
                            source={Icons.bottomTabNavigatorIcons.monsters}
                        />
                    );
                }
            }
        }
    },
    {
        tabBarOptions: {
            showLabel: false,
            inactiveTintColor: 'grey',
            style: {
                backgroundColor: '#f2f2f2',
                borderTopWidth: 0.5,
                borderTopColor: 'grey'
            },
            indicatorStyle: {
                height: 0
            },
            showIcon: true
        },
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        navigationOptions: ({navigation}) => {
            [navigation.state.index];
            return {
                headerTitle: <HeaderComponent/>
            };
        }
    });

const DashboardStackNavigator = createStackNavigator({
    DashboardTabNavigator: DashboardTabNavigator,
    FeatureScreen: {screen: FeatureScreen},
    MonsterScreen: {screen: MonsterScreen},
    SpellScreen: {screen: SpellScreen},
    HeaderComponent: {screen: HeaderComponent},
    SettingsScreen: {screen: SettingsScreen},
    CharacterDisplayScreen: {screen: CharacterDisplayScreen},
    ShareCharacterScreen: {screen: ShareCharacterScreen},
    CharacterAddScreen: {screen: CharacterAddScreen},
    DiceRollResultScreen: {screen: DiceRollResultScreen}
});
const DashboardContainer = createAppContainer(DashboardStackNavigator);

export default class DashboardNavigation extends React.Component {

    render() {
        return (
            <DashboardContainer/>
        )
    }
}