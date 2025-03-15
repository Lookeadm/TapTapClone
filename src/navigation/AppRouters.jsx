import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigation from './AuthNavigation';
import SplashScreen from '../screens/auth/SplashScreen';

const AppRouters = () => {
    const [isShowSplash, setIsShowSplash] = useState(true);
    const { getItem } = useAsyncStorage('auth');
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        checkLogin();
        const timeOut = setTimeout(()=>{
            setIsShowSplash(false);
        }, 1500);
        return () => clearTimeout(timeOut);
    }, []);
    checkLogin = async () => {
        const res = await getItem();
        res &&
            dispatch(
                addAuth(JSON.parse(res)),
            );
    }
    return <>{ isShowSplash ? <SplashScreen/> : auth.token ? <BottomTabNavigator/> : <AuthNavigation/> }</>
}

export default AppRouters

const styles = StyleSheet.create({})