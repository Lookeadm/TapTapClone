import { View, Text } from 'react-native'
import React from 'react'
import { StarOutlined } from '@ant-design/icons'
import { DividerComponent, RowComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'

// Tách Star Component ra ngoài để tránh re-render không cần thiết
const Star = ({ count }) => (
    <View style={{ width: 50 }}>
        <RowComponent styles={{ marginBottom: 3 }}>
            {Array.from({ length: count }, (_, index) => (
                <StarOutlined
                    key={index}
                    style={{ fontSize: 11, color: appColors.gray }}
                />
            ))}
        </RowComponent>
    </View>
);

const RatingComponent = () => {
    // Dùn map thay vì while
    const rating = Array.from({ length: 5 }, (_, i) => (
        <RowComponent key={i} style={{ flexDirection: 'row-reverse' }}>
            {Star(i+1)}
            <DividerComponent rating />
        </RowComponent>
    )).reverse(); // Đảo ngược mảng trước khi render

    return (
        <View>
            <TextComponent
                text='Ratings & Reviews'
                color={appColors.white}
                size={17}
                font='bold'
            />
            <RowComponent>
                <View>
                    <RowComponent>
                        <TextComponent
                            text='8.0'
                            color={appColors.white}
                            size={50}
                            font='bold'
                        />
                        <TextComponent
                            text='/10'
                            color={appColors.gray6}
                            size={17}
                        />
                    </RowComponent>
                    <TextComponent
                        text='3k Ratings'
                        color={appColors.gray6}
                        size={13}
                    />
                </View>
                <SpaceComponent width={30} />
                <View style={{ marginEnd: 0 }}>
                    {rating}
                </View>
            </RowComponent>
        </View>
    );
};

export default RatingComponent;
