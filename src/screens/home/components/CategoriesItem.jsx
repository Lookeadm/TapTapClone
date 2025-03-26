import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGamepad, faFire, faClock, faStar, faBell, faBookmark, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { RowComponent, TextComponent } from '../../../components';
import { appColors } from '../../../constants/appColors';

const CategoryComponent = ({
    index,
    detail,
    styles,
    change
}) => {
    const categories = [
        { iconName: faGamepad, categoryName: "Genres" },
        { iconName: faFire, categoryName: "New Releases" },
        { iconName: faClock, categoryName: "Upcoming" },
        { iconName: faStar, categoryName: "Top Rated" }
    ]

    const detailItem = [
        { iconName: faBookmark, itemName: 'Whislist' },
        { iconName: faStar, itemName: 'Played' },
        { iconName: faArrowUpRightFromSquare, itemName: 'Share' },
    ]

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setSelectedIndex(index); // Cập nhật selectedIndex khi index thay đổi
    }, [index]); // useEffect chỉ chạy khi `index` thay đổi

    const renderCategory = () => categories.map((item, index) => {
        const { iconName, categoryName } = item;
        return (
            <TouchableOpacity
                onPress={() => setSelectedIndex(index)}
                key={index}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >{
                        change ? (
                            <View></View>
                        ) : (
                            <FontAwesomeIcon
                                icon={iconName}
                                size={34}
                                style={{
                                    color: selectedIndex == index ? appColors.green : appColors.white
                                }}
                            />)
                    }
                    <TextComponent
                        text={categoryName}
                        size={14}
                        styles={{
                            color: selectedIndex == index ? appColors.green : appColors.white,
                            fontWeight: selectedIndex == index ? 'bold' : 'medium',
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
    })

    const renderItem = () => detailItem.map((item, index) => {
        const { iconName, itemName } = item;
        return (
            <TouchableOpacity
                onPress={() => setSelectedIndex(index)}
                key={index}
            >
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <FontAwesomeIcon
                        icon={iconName}
                        size={24}
                        style={{
                            color: selectedIndex == index ? appColors.green : appColors.white
                        }}
                    />
                    <TextComponent
                        text={itemName}
                        size={14}
                        color={appColors.white}
                    />
                </View>
            </TouchableOpacity>
        )
    })

    return detail ? (
        <View style={[{ width: '60%' }, styles]}>
            <RowComponent justify="space-between">
                {renderItem()}
            </RowComponent>
        </View>
    ) : (
        <View style={styles}>
            <RowComponent justify="space-between">
                {renderCategory()}
            </RowComponent>
        </View>
    );
};

export default CategoryComponent;
