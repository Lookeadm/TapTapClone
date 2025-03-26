import { View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/globalStyles';

const ContainerComponent = ({
    isImageBackground,
    isScroll,
    children,
}) => {
    const returnContainer = isScroll ? (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    ) : (
        <View style={{ flex: 1 }}>{children}</View>
    );

    return isImageBackground ? (
        <ImageBackground
            style={{ flex: 1 }}
            imageStyle={{flex: 1}}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {returnContainer}
            </SafeAreaView>
        </ImageBackground>
    ) : (
        <View style={{flex: 1}}>
            {returnContainer}
        </View>
    );
};

export default ContainerComponent;
