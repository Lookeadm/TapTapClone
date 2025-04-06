import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { appColors } from '../constants/appColors';

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
        <View style={styles.inputContainer}>
            {/* affix nếu có */}
            {affix && <Text style={styles.affixText}>{affix}</Text>}
            
            {/* TextInput */}
            <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholder ?? ''}
                onChangeText={onChange}
                secureTextEntry={isShowPass}
                placeholderTextColor="#7c7c7c"  // Màu chữ của placeholder
                keyboardType={type ?? 'default'}
                autoCapitalize="none"
                onEndEditing={onEnd}
            />

            {/* suffix nếu có */}
            {suffix && <Text style={styles.suffixText}>{suffix}</Text>}

            {/* Touchable để ẩn/hiện mật khẩu hoặc xóa giá trị */}
            <TouchableOpacity
                onPress={isPassword ? () => setIsShowPass(!isShowPass) : () => onChange('')}
            >
                {isPassword ? (
                    <Text style={styles.iconText}>{isShowPass ? 'Show' : 'Hide'}</Text>
                ) : (
                    value?.length > 0 && allowClear && (
                        <Text style={styles.iconText}>Clear</Text>
                    )
                )}
            </TouchableOpacity>
        </View>
    );
};

export default InputComponent;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderColor: appColors.gray3,
        width: '100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#333333',
        marginBottom: 19,
    },
    input: {
        flex: 1,
        paddingHorizontal: 14,
        color: appColors.white, 
    },
    affixText: {
        color: appColors.primary,  
        marginRight: 10,  
    },
    suffixText: {
        color: appColors.primary,  
        marginLeft: 10,  
    },
    iconText: {
        color: appColors.gray,  
    }
});
