import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ButtonComponent, DividerComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, TextComponent } from '../../../components'
import { fontFamilies } from '../../../constants/fontFamilies'
import { appColors } from '../../../constants/appColors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CardGames = ({
  title,
  image,
  rating,
  genres,
  flatform,
  video,
  topChart,
  number,
  background,
  description
}) => {

  const categories = () => {
    genres.slice(0, 3).map((genre, index) => (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextComponent
          text={genre.name}
          color={appColors.gray6}
          size={12}
        />
        {index < item.categories.slice(0, 3).length - 1 && <SeparatorComponent />}
      </View>
    ))
  }

  return topChart ? (
    <View>
      <SectionComponent>
        <RowComponent justify={'space-between'}>
          <TextComponent
            text={number}
            font={fontFamilies.bold}
            color={appColors.white}
          />
          <Image source={{ uri: image }} style={{ width: 70, height: 70, borderRadius: 15 }} />
          <View>
            <TextComponent
              size={16}
              text={title}
              font='bold'
              color={appColors.white}
              numberOfLines={1}
              styles={{
                width: 180
              }}
            />
            <RowComponent>
              <AntDesign name="star" size={12} color={appColors.gray6} style={{ marginRight: 4 }} />
              <TextComponent
                text={rating}
                color={appColors.gray6}
                size={12}
                styles={{ marginHorizontal: 4 }}
              />
            </RowComponent>
            <TextComponent
              text={genres}
              color={appColors.gray6}
              size={12}
              styles={{ marginHorizontal: 4 }}
            />
          </View>
          <ButtonComponent
            text="Download"
            textColor={appColors.green}
            borderColor={appColors.green}
            border
          />
        </RowComponent>
      </SectionComponent>
      <DividerComponent />
    </View>
  ) : (
    <>
      <View>
        <SectionComponent>
          <RowComponent justify="space-between" textColor={appColors.primary}>
            <RowComponent>
              <Image source={{ uri: image }} style={{ width: 40, height: 40, borderRadius: 10 }} />
              <SpaceComponent width={10} />
              <View>
                <TextComponent
                  size={16}
                  text={title}
                  font={fontFamilies.bold}
                  color={appColors.white}
                  numberOfLines={1}
                  styles={{
                    width: 180
                  }}
                />
                <RowComponent>
                  <AntDesign name="star" size={11} color={appColors.gray6} />
                  <TextComponent
                    text={rating}
                    color={appColors.gray6}
                    size={12}
                    styles={{ marginHorizontal: 4 }}
                  />
                  {genres.slice(0, 3).map((genre, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <SeparatorComponent />
                      <TextComponent
                        text={genre.name}
                        color={appColors.gray6}
                        size={12}
                      />
                    </View>
                  ))}
                  <SeparatorComponent />
                  <FontAwesome name="apple" size={12} color={appColors.gray6} style={{ marginRight: 5 }} />
                  <FontAwesome name="android" size={12} color={appColors.gray6} style={{ marginRight: 5 }} />
                </RowComponent>
              </View>
            </RowComponent>
            <ButtonComponent
              text="Download"
              textColor={appColors.green}
              borderColor={appColors.green}
              border
            />
          </RowComponent>
        </SectionComponent>
        <Image source={{ uri: background }} style={{ width: '100%', height: 250 }} />
        <SpaceComponent height={10} />
        <SectionComponent>
          <TextComponent
            text={description}
            color={appColors.white}
            numberOfLines={2}
          />
        </SectionComponent>
        <DividerComponent />
      </View>
    </>
  )
}

export default CardGames