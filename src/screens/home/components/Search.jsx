import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput } from 'react-native';
import React, { useRef } from 'react';
import { globalStyles } from '../../../styles/globalStyles';
import { appColors } from '../../../constants/appColors';

const SearchInputComponent = ({
    home
}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const searchInputAnimation = {
        transform: [
            {
                scaleX: animatedValue.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                })
            },
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 25],
                    outputRange: [1, -100],
                    extrapolate: 'clamp',
                })
            },
        ],
        opacity: animatedValue.interpolate({
            inputRange: [0, 25],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        }),
    }
    const AnimatedTextInput = Animated.createAnimatedComponent(Text);
    return home ? (
        <Animated.View style={[globalStyles.searchContainer, searchInputAnimation]}>
            {/* <Ionicons
                name="search-outline"
                size={22}
                color={appColors.gray}
            /> */}
            <AnimatedTextInput style={[globalStyles.input, searchInputAnimation]}>Search...</AnimatedTextInput>
        </Animated.View>
    ) : (
        <View style={[globalStyles.searchContainer]}>
            {/* <Ionicons
                name="search-outline"
                size={22}
                color={appColors.gray}
            /> */}
            <TextInput style={[globalStyles.input]} placeholder='Search'></TextInput>
        </View>
    )
}

export default SearchInputComponent;
