import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { appColors } from '../../../constants/appColors';
import { TextComponent } from '../../../components';

const SwiperGames = () => {
    const slides = [
        {
            title: "Game of the day",
            image: require('../../../../assets/images/ImageTest.png'),
            name: "Delta Force",
            description: "Delta Force launch on January 20, 2025 on mobile. Pre-register now",
        },
        {
            title: "Featured Game",
            image: require('../../../../assets/images/ImageTest.png'),
            name: "Call of Duty Mobile",
            description: "Experience the thrill of battle on mobile now!",
        },
        {
            title: "Top Action Game",
            image: require('../../../../assets/images/ImageTest.png'),
            name: "PUBG Mobile",
            description: "Jump into the action and become the last one standing!",
        },
    ];

    return (
        <View
            style={{
                height: 320,
                backgroundColor: appColors.gray7,
                borderRadius: 10,
                padding: 10
            }}
        >
            <Swiper
                showsPagination={true}
                loop={true}
                activeDotColor={appColors.gray}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                paginationStyle={styles.pagination}
            >
                {slides.map((slide, index) => (
                    <View style={styles.slide} key={index}>
                        <TextComponent text={slide.title} color={appColors.white}/>
                        <Image source={slide.image} style={styles.image} />
                        <TextComponent text={slide.name} color={appColors.white}/>
                        <TextComponent text={slide.description} color={appColors.white}/>
                    </View>                   
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '100%',
        height: 302,
        backgroundColor: appColors.gray,
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 181,
        borderRadius: 10,
        resizeMode: 'cover',
        marginVertical: 10,
    },
    dot: {
        backgroundColor: '#A3A3A3',
        width: 4,
        height: 4,
        borderRadius: 4,
        marginTop: 10,
    },
    activeDot: {
        backgroundColor: '#fcfcfc',
        width: 5,
        height: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    pagination: {
        bottom: 10,
    },
});

export default SwiperGames;
