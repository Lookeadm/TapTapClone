import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen'
import DetailsScreen from '../screens/details/DetailScreen';
import SearchHistory from '../screens/search/components/SearchHistory';
import SearchScreen from '../screens/search/SearchScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home stack
const HomeStack = () => (
  <Stack.Navigator
      screenOptions={{
        headerShown: false 
      }}
    >
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Details" component={DetailsScreen}/>
    <Stack.Screen name="Search" component={SearchScreen}/>
    <Stack.Screen name="Profile" component={ProfileScreen}/>
  </Stack.Navigator>
);

// Bottom Tab Navigator
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // tabBarIcon: ({ focused, color, size }) => {
        //   const icons = {
        //     Home: focused ? 'home' : 'home-outline',
        //   };
        //   return <Ionicons name={icons[route.name]} size={size} color={color} />;
        // },
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
        
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
