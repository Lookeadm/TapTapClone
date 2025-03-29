import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Validate } from '../../utils/validate';
import AxiosInstance from '../../apis/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { LoadingModal } from '../../modals';
import { appColors } from '../../constants/appColors';
import { addAuth } from '../../redux/reducers/authReducer';
import { Switch } from 'react-native-gesture-handler';
import authenticationAPI from '../../apis/authenticationAPI';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const emailValidation = Validate.email(email);
        if (!email || !password || !emailValidation) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
    }, [email, password])

    const handleLogin = async () => {
        const emailValidation = Validate.email(email);
        if (emailValidation) {
            setIsLoading(true);
            try {
                const res = await authenticationAPI.HandleAuthentication(
                  '/login', 
                  {email, password},
                  'post',
                );
                dispatch(addAuth(res.data));
                await AsyncStorage.setItem(
                    'auth',
                    isRemember ? JSON.stringify(res.data) : email,
                );
                console.log("Login Successful");
                
            } catch (error) {
                console.log("Đăng nhập thất bại!", error);
            }
            finally {
                setIsLoading(false);
            }
        }
        else {
            alert('Email is not correct');
        }
    }

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center'
        }} children={undefined}>
      </SectionComponent>

      <SectionComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent height={16} />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          // isPassword
          allowClear
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
        />
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Remember me" />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPassword')}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent
          onPress={handleLogin}
          text="SIGN IN"
          type='primary'
          disabled={isLoading}
        />
        {isLoading && <ActivityIndicator size="small" color={appColors.primary} />}
      </SectionComponent>
      {/* <SocialLogin /> */}
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account?" />
          <ButtonComponent type="link" text="Sign up" onPress={() => navigation.navigate('Register')} />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen

const styles = StyleSheet.create({})