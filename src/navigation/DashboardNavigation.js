import React from 'react';
import TestScreen from '../screens/TestScreen';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';
import FeaturesScreen from "../screens/features/FeaturesScreen";
import SpellsScreen from "../screens/spells/SpellsScreen";
import MonstersScreen from "../screens/monsters/MonstersScreen";
import FeatureScreen from "../screens/features/FeatureScreen";

const DashboardTabNavigator = createBottomTabNavigator({
    TestScreen: {screen: TestScreen},
    FeaturesScreen: {screen: FeaturesScreen},
    SpellsScreen: {screen: SpellsScreen},
    MonstersScreen: {screen: MonstersScreen}
});

const DashboardStackNavigator = createStackNavigator({
    DashboardTabNavigator: DashboardTabNavigator,
    FeatureScreen: {screen: FeatureScreen}
});
const DashboardContainer = createAppContainer(DashboardStackNavigator);

export default class DashboardNavigation extends React.Component {

    render() {
        return <DashboardContainer/>;
    }
}