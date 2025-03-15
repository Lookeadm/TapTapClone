import { View, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { appColors } from '../constants/appColors'

const DividerComponent = ({
  rating
}) => {
  return rating ? (
    <View style={{
        height: 4,
        backgroundColor: appColors.gray6,
        width: 170,
        marginLeft: 10,
        borderRadius: 10
    }} />
  ):(
    <View style={globalStyles.divider} />
  )
}

export default DividerComponent