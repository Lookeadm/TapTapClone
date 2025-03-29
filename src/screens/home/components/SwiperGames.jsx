import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import { appColors } from '../../../constants/appColors';
import { RowComponent, TextComponent } from '../../../components';

const SwiperGames = () => {
    const slides = [
        {
            title: "Game of the day",
            image: require('../../../../assets/images/banner.png'),
            name: "Genshin Impact",
            description: "Delta Force launch on January 20, 2025 on mobile. Pre-register now",
        },
        {
            title: "Featured Game",
            image: require('../../../../assets/images/banner2.jpg'),
            name: "Zenless Zone Zero",
            description: "Experience the thrill of battle on mobile now!",
        },
        {
            title: "Top Action Game",
            image: require('../../../../assets/images/banner3.jpg'),
            name: "Honkai Star Rail",
            description: "Jump into the action and become the last one standing!",
        },
    ];

    return (
        <View style={styles.slide}>
            <Swiper
                showsPagination={true}
                loop={true}
                activeDotColor={appColors.gray}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                paginationStyle={styles.pagination}
            >
                {slides.map((slide, index) => (
                    <View key={index}>
                        {/* <TextComponent styles={styles.title} text={slide.title} color={appColors.white} fontWeight={'bold'} /> */}
                        <Image source={slide.image} style={styles.image} />
                        <View style={{paddingHorizontal: 10}}> 
                        <RowComponent justify={'space-between'}>
                            <TextComponent text={slide.name} color={appColors.white} fontWeight={'bold'}/>
                            <View style={styles.score}>
                                <TextComponent text={"Score"} color={appColors.green} fontWeight={'bold'}/>
                                <TextComponent text={"8.6"} color={appColors.green} fontWeight={'bold'}/>
                            </View>
                        </RowComponent>
                        <TextComponent text={slide.description} color={appColors.white} />
                        </View>
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
        height: 300,
        backgroundColor: appColors.gray7,
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'cover',
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
    title: {
        position: 'absolute'
    },
    score: {
        marginTop: 5,
        alignItems: 'center'
    }
});

export default SwiperGames;
