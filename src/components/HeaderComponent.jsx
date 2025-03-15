import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import SpaceComponent from './SpaceComponent';
import RowComponent from './RowComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faChevronLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { appColors } from '../constants/appColors';
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';

const HeaderComponent = ({
    title,
    back,
    detail
}) => {
    const navigation = useNavigation();
    return(
        <View>
            <SpaceComponent height={35}/>
            {(title || back) && (
                <RowComponent
                    styles={{
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        minWidth: 48,
                        minHeight: 48,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
            >
                {back && (
                    
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()} 
                        style={{marginRight: 12}}
                    >
                        <FontAwesomeIcon 
                            icon={faChevronLeft}
                            color={appColors.white}
                            size={20}
                        />
                    </TouchableOpacity>
                )}
                {title && (
                    <TextComponent
                        text={title}
                        size={16}
                        font={fontFamilies.medium}
                        flex={1}
                    />
                )}
                {detail &&(
                    <TouchableOpacity>
                        <RowComponent>
                            <FontAwesomeIcon 
                                icon={faBell} 
                                color={appColors.white}
                                size={20}
                            />
                            <SpaceComponent width={20}/>
                            <FontAwesomeIcon 
                                icon={faEllipsis} 
                                color={appColors.white}
                                size={20}
                            />
                        </RowComponent>
                    </TouchableOpacity>
                )}
            </RowComponent>
            )}
        </View>
        );
}

export default HeaderComponent