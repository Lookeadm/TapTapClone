import { View, Text, Image } from 'react-native'
import React from 'react'
import { RowComponent, SpaceComponent, TextComponent } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCancel, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { appColors } from '../../../constants/appColors'

const SearchHistory = ({
  image
}) => {

  const item = [
    { name: 'Clash of Clans', image: require('../../../../assets/images/banner.png') },
    { name: 'Clash of Clans', image: require('../../../../assets/images/banner.png') },
    { name: 'Clash of Clans', image: require('../../../../assets/images/banner.png') },
  ]

  const renderItem = () => item.map((item, index) => {
    const { name, image } = item;
    return (
      <View key={index} >
        <SpaceComponent height={10} />
        <RowComponent justify={'space-between'}>

          <RowComponent >
            <Image source={image} style={{ width: 20, height: 20, borderRadius: 5 }} />
            <TextComponent text={name} color={appColors.white} />
          </RowComponent>
          <FontAwesomeIcon icon={faCircleXmark} color={appColors.white} />
        </RowComponent>
      </View>
    )
  })

  return (
    <View>
      {renderItem()}
    </View>
  )
}

export default SearchHistory