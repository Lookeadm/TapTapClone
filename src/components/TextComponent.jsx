import { View, Text, Platform } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { appColors } from '../constants/appColors'
import { fontFamilies } from '../constants/fontFamilies'

const TextComponent = ({
    text,
    size,
    flex,
    font,
    color,
    styles,
    title,
    fontWeight,
    numberOfLines
}) => {

  const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14;
  
  const getFontSize = () => {
    if (size) return size;
    if (title) return 24;
    return fontSizeDefault;
  }

  const getFontFamily = () => {
    if (font) return font;
    if (title) return fontFamilies.medium;
    return fontFamilies.regular;
  }

  return (
    <Text
        style={[
            globalStyles.text,
            {
                color: color ?? appColors.text,
                flex: flex ?? 0,
                fontSize: getFontSize(),
                fontFamily: getFontFamily(),
                fontWeight: fontWeight,
            },
            styles,
        ]}
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
    >
        {text}
    </Text>
)

}

export default TextComponent