import { View, Text, Image } from 'react-native'
import React from 'react'
import { ButtonComponent, SectionComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'

const AppItemComponent = ({
    image,
    title
}) => {
  return (
    <>
    <View style={{marginRight: 5}}>
      <SectionComponent 
        styles={{width: 80}}
      >
        <Image source={{ uri: image }} style={{ width: 70, height: 70, borderRadius: 15 }} />
        <TextComponent
            size={14}
            text={title}
            color={appColors.white}
            styles={{
              overflow: 'hidden',
              width: 70
            }}
            numberOfLines={2}
        />
      </SectionComponent>
      
    </View>
    </>
  )
}

export default AppItemComponent