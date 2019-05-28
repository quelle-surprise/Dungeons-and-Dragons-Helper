import React from 'react';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';
import FeaturesScreen from "../screens/features/FeaturesScreen";
import CharacterScreen from '../screens/CharacterScreen';
import MonstersScreen from "../screens/monsters/MonstersScreen";
import SpellsScreen from "../screens/spells/SpellsScreen";
import FeatureScreen from "../screens/features/FeatureScreen";
import HeaderComponent from '../components/HeaderComponent';
import SettingsScreen from "../screens/SettingsScreen";
import CharacterDisplayScreen from "../screens/CharacterDisplayScreen";
import RollDiceScreen from "../screens/diceRoll/DiceRollScreen";
import DiceRollResultScreen from "../screens/diceRoll/DiceRollResultScreen";
import SpellScreen from "../screens/spells/SpellScreen";
import MonsterScreen from "../screens/monsters/MonsterScreen";

const DashboardTabNavigator = createBottomTabNavigator({
    CharacterScreen: {screen: CharacterScreen},
    FeaturesScreen: {screen: FeaturesScreen},
    SpellsScreen: {screen: SpellsScreen},
    MonstersScreen: {screen: MonstersScreen},
    RollDice: {screen: RollDiceScreen}
},
{
    navigationOptions: ({ navigation }) => {
        [navigation.state.index];
        return {
            headerTitle: <HeaderComponent/>
        };
    }
}
);

const DashboardStackNavigator = createStackNavigator({
    DashboardTabNavigator: DashboardTabNavigator,
    FeatureScreen: {screen: FeatureScreen},
    MonsterScreen: {screen: MonsterScreen},
    SpellScreen: {screen: SpellScreen},
    HeaderComponent: {screen: HeaderComponent},
    SettingsScreen: {screen: SettingsScreen},
    CharacterDisplayScreen: {screen: CharacterDisplayScreen},
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