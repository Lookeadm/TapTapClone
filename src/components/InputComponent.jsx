import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Touchable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { appColors } from '../constants/appColors';
import { globalStyles } from '../styles/globalStyles';

const InputComponent = ({
    value,
    onChange,
    affix,
    placeholder,
    suffix,
    isPassword,
    allowClear,
    type,
    onEnd
}) => {
    const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

    return (
        <View style={[styles.inputContainer]}>
            {affix ?? affix}
            <TextInput 
                style={[styles.input, globalStyles.text]}
                value={value}
                placeholder={placeholder ?? ''}
                onChangeText={val => onChange(val)}
                secureTextEntry={isShowPass}
                placeholderTextColor={'#747688'}
                keyboardType={type??'default'}
                autoCapitalize='none'
                onEndEditing={onEnd}
            />
            {suffix ?? suffix}
            <TouchableOpacity
                onPress={
                    isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')
                }>
                {isPassword ? (
                    // <FontAwesome 
                    //     name={isShowPass ? 'eye-slash' : 'eye'} 
                    //     size={22} 
                    //     color={appColors.gray} />
                    <View></View>
                ) : (
                    value?.length > 0 &&
                    allowClear && (
                        <View></View>
                    )
                )}
            </TouchableOpacity>
        </View>
    )
}
export default InputComponent;

const styles = StyleSheet.create({
    inputContainer:{
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray3,
        width: '100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: appColors.white,
        marginBottom: 19
    },
    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 14,
        color: appColors.text, 
    }
});