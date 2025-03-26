import { View, Text } from 'react-native'
import React from 'react'
import SearchInputComponent from './components/SearchInputComponent'
import { DividerComponent, SectionComponent, SpaceComponent } from '../../components'
import SearchHistory from './components/SearchHistory'

const SearchScreen = ({ navigation }) => {
    return (
        <View>
            <SpaceComponent height={40} />
            <SectionComponent>
                <SearchInputComponent/>
            </SectionComponent>
            <DividerComponent/>
            <SectionComponent>
                <SearchHistory/>
            </SectionComponent>
            <DividerComponent/>
        </View>
    )
}

export default SearchScreen