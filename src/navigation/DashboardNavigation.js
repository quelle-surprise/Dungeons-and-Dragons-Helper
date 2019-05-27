import React from 'react';
import {
    createAppContainer,
    createBottomTabNavigator,
} from 'react-navigation';
import CharacterScreen from '../screens/CharacterScreen';
import SkillsScreen from "../screens/skills/SkillsScreen";
import SpellsScreen from "../screens/spells/SpellsScreen";
import MonstersScreen from "../screens/monsters/MonstersScreen";

const DashboardTabNavigator = createBottomTabNavigator({
    CharacterScreen: {screen: CharacterScreen},
    SkillsScreen: {screen: SkillsScreen},
    SpellsScreen: {screen: SpellsScreen},
    MonstersScreen: {screen: MonstersScreen}
});

const DashboardContainer = createAppContainer(DashboardTabNavigator);

export default class DashboardNavigation extends React.Component {

    render() {
        return (
            <DashboardContainer/>
        ) 
    }
}