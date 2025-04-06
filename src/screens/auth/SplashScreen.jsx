import React from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import { SpaceComponent } from '../../components';
import { appInfo } from '../../constants/appInfos';
import { appColors } from '../../constants/appColors';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../../../assets/images/SlashScreen.jpg')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      imageStyle={{flex: 1}}>
      <SpaceComponent height={16} />
      <ActivityIndicator color={appColors.gray} size={22} />
    </ImageBackground>
  );
};

export default SplashScreen;