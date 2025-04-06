import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native'
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

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
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
        const body = {
          email, password, username
        }
        if (emailValidation) {
            setIsLoading(true);
            try {
                const res = await AxiosInstance().post("users/register", body);
                if(res.status === 200){
                  console.log("Register Successful"); 
                  navigation.navigate("LoginScreen");
                }
                else{
                  Alert.alert("Đăng ký thất bại", "Email đã được đăng ký" );
                }
                
            } catch (error) {
                console.log("Đăng nhập thất bại!", error);
            }
            finally {
                setIsLoading(false);
            }
        }
        else {
          Alert.alert('Email is not correct');
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
        <TextComponent size={24} title text="Sign in"/>
        <SpaceComponent height={16} />
        <InputComponent
          value={username}
          placeholder="Username"
          onChange={val => setUsername(val)}
          allowClear
        />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          allowClear
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
        />
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent
          onPress={handleLogin}
          text="SIGN UP"
          type='primary'
          disabled={isLoading}
          textColor={appColors.black}
          textWeigth={'bold'}
        />
        {isLoading && <ActivityIndicator size="small" color={appColors.primary} />}
      </SectionComponent>
      {/* <SocialLogin /> */}
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="You have an account?" />
          <ButtonComponent type="link" text="Log in" onPress={() => navigation.navigate('LoginScreen')} textColor={appColors.green} textWeigth={'bold'}/>
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default RegisterScreen

const styles = StyleSheet.create({})