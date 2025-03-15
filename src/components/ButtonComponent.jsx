import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextComponent from './TextComponent'
import { appColors } from '../constants/appColors'
import { fontFamilies } from '../constants/fontFamilies'
import { globalStyles } from '../styles/globalStyles'
import PropTypes from 'prop-types'

const ButtonComponent = ({
    icon,
    text,
    textColor,
    textStyles,
    textFont,
    color,
    styles,
    onPress,
    iconFlex,
    type,
    disable,
    borderColor,
    border,
    textWeigth
}) => {
    const getBackgroundColor = () => {
        if (color) return color;
        if (disable) return appColors.gray4;
        return appColors.primary;
    }
    const PrimaryButton = () => (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
                onPress={onPress}
                style={[
                    globalStyles.button,
                    globalStyles.shadow,
                    {
                        backgroundColor: getBackgroundColor(),
                        marginBottom: 17,
                        width: '90%',
                        borderColor: borderColor,
                    },
                    styles,
                ]}>
                {icon && iconFlex === 'left' && icon}
                <TextComponent
                    text={text}
                    color={textColor ?? appColors.white}
                    styles={[
                        textStyles,
                        {
                            marginLeft: icon ? 12 : 0,
                            fontSize: 16,
                            textAlign: 'center',
                        },
                    ]}
                    flex={icon && iconFlex === 'right' ? 1 : 0}
                    font={textFont ?? fontFamilies.medium}
                />
                {icon && iconFlex === 'right' && icon}
            </TouchableOpacity>
        </View>
    )
    
    const SecondaryButton = () => (
        <TouchableOpacity
            style={[
                globalStyles.downloadButton,
                {
                    backgroundColor: color ? color : 'transparent',
                    borderColor: color || appColors.green,
                    borderWidth: border ? 2 : 0,
                    
                },
                styles,
            ]}
            onPress={onPress}>
            <TextComponent
                flex={0}
                text={text}
                color={textColor}
                font={textFont}
                fontWeight={textWeigth}
            />
        </TouchableOpacity>
    )
    
    // Main return
    return type === 'primary' ? <PrimaryButton /> : <SecondaryButton />

}

ButtonComponent.propTypes = {
    icon: PropTypes.element, // Kiểu dữ liệu là React Node
    text: PropTypes.string.isRequired, // Bắt buộc là chuỗi
    type: PropTypes.oneOf(['primary', 'text', 'link']), // Giá trị chỉ có thể là 'primary', 'text', hoặc 'link'
    color: PropTypes.string, // Màu dạng chuỗi
    styles: PropTypes.object, // Kiểu dáng cho View (StyleProp không sử dụng được trong prop-types)
    textColor: PropTypes.string, // Màu văn bản dạng chuỗi
    textStyles: PropTypes.object, // Kiểu dáng cho Text
    textFont: PropTypes.string, // Phông chữ dạng chuỗi
    onPress: PropTypes.func, // Hàm được gọi khi nhấn
    iconFlex: PropTypes.oneOf(['right', 'left']), // Chỉ nhận giá trị 'right' hoặc 'left'
    disable: PropTypes.bool,
    borderColor: PropTypes.string,
    border: PropTypes.bool
}

export default ButtonComponent
