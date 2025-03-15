import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen'
import DetailsScreen from '../screens/details/DetailScreen';

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
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
