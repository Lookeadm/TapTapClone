import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const [isExistingUser, setIsExistingUser] = useState(false);

  useEffect(()=>{
      checkUserExisting()
  }, []);

  const checkUserExisting = async () => {
      const res = await AsyncStorage.getItem('auth');

      res && setIsExistingUser(true);
  }
  return (
    <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
  )
}

export default AuthNavigation