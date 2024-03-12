import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screenOptions: {
        headerShown: false,
    },
    screens: {
        Home: HomeScreen,
        BookDetails: BookDetailsScreen
    },
});

export const Navigation = createStaticNavigation(RootStack);
