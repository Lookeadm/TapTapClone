import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigation from './AuthNavigation';
import SplashScreen from '../screens/auth/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../screens/details/DetailScreen';
import ReviewScreen from '../screens/details/ReviewScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AppRouters = () => {
    const [isShowSplash, setIsShowSplash] = useState(true);
    const { getItem } = useAsyncStorage('auth');
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkLogin = async () => {
            const res = await getItem();
            res && dispatch(addAuth(JSON.parse(res)));
        };

        checkLogin();
        const timeOut = setTimeout(() => {
            setIsShowSplash(false);
        }, 1500);

        return () => clearTimeout(timeOut);
    }, []);

    if (isShowSplash) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {auth.token ? (
            <>
              <Stack.Screen name="Home" component={BottomTabNavigator} />
              <Stack.Screen name="Detail" component={DetailsScreen} />
              <Stack.Screen name="Review" component={ReviewScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthNavigation} />
            </>
          )}
        </Stack.Navigator>
      );
};

export default AppRouters

const styles = StyleSheet.create({})