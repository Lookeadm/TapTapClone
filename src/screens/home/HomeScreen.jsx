import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import config from '../../apis/config'
import { useDispatch } from 'react-redux';
import { AppItem, Categories, CategoriesItem, Search } from './components';
import { DividerComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, TextComponent } from '../../components';
import SwiperGames from './components/SwiperGames';
import CardGames from './components/CardGames';
import { appColors } from '../../constants/appColors';
import PagerView from 'react-native-pager-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Animated, {useSharedValue, withTiming, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate, useDerivedValue} from 'react-native-reanimated'

var apiKey = config.API_KEY;
var url = config.API_URL;

const CATEGORY_MAX_HEIGHT = 50;
const CATEGORY_MIN_HEIGHT = 5;
const CATEGORY_MAX_SCALE = 1;
const CATEGORY_MIN_SCALE = 0;

const HomeScreen = ({ navigation }) => {
    const [games, setGames] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollY = useSharedValue(0);

    useEffect(() => {
        fetch(`${url}?key=${apiKey}&page_size=20&platforms=3&`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setGames(data.results) // In ra dữ liệu JSON
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }, []);
    const renderHorizontalGames = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { game: item })}
            activeOpacity={1}
        >
            <AppItem
                title={item.name}
                image={item.background_image}
            />
        </TouchableOpacity>
    );
    const renderGame = ({ item, index }) => {
        if (index === 0) {
            return (
                <View>
                    <SectionComponent>
                        <SwiperGames />
                    </SectionComponent>
                </View>
            );
        }
        if (index % 4 === 3) {
            const horizontalGames = games.slice(index, index + 5); // Lấy 4 game tiếp theo
            return (
                <View>
                    <Categories />
                    <FlatList
                        data={horizontalGames}
                        keyExtractor={(game) => game.id.toString()}
                        renderItem={renderHorizontalGames}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: 'row',
                        }}
                    />
                    <DividerComponent />
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Details', { game: item })}
                activeOpacity={1}
            >
                <CardGames
                    title={item.name}
                    image={item.background_image}
                    rating={item.rating}
                    genres={item.genres.slice(0, 3).map((genre, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextComponent
                                text={genre.name}
                                color={appColors.gray6}
                                size={12}
                            />
                            {index < item.genres.slice(0, 3).length - 1 && <SeparatorComponent />}
                        </View>
                    ))}
                />
            </TouchableOpacity>
        );
    };
    const renderTopChart = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Details', { game: item })}
                activeOpacity={1}
            >
                <CardGames
                    topChart
                    number={index + 1}
                    title={item.name}
                    image={item.background_image}
                    rating={item.rating}
                    genres={item.genres.slice(0, 2).map((genre, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextComponent
                                text={genre.name}
                                color={appColors.gray6}
                                size={12}
                            />
                            {index < item.genres.slice(0, 2).length - 1 && <SeparatorComponent />}
                        </View>
                    ))}
                />
            </TouchableOpacity>
        );
    }

    const derivedScrollY = useDerivedValue(() => 
        interpolate(
            scrollY.value,
            [0, CATEGORY_MAX_HEIGHT - CATEGORY_MIN_HEIGHT],
            [CATEGORY_MAX_HEIGHT, CATEGORY_MIN_HEIGHT],
            Extrapolate.CLAMP
        )
    );
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
      });
    const heightStyle = useAnimatedStyle(()=>{
        return {
            height: derivedScrollY.value,
            opacity: interpolate(
                scrollY.value,
                [0, CATEGORY_MAX_HEIGHT - CATEGORY_MIN_HEIGHT],
                [1, 0],
                Extrapolate.CLAMP
              ),
              
    }});

    const itemStyle = useAnimatedStyle(() => {
        return {
          scale: interpolate(
            scrollY.value,
            [0, CATEGORY_MAX_HEIGHT - CATEGORY_MIN_HEIGHT],
            [CATEGORY_MAX_SCALE, CATEGORY_MIN_SCALE],
            Extrapolate.CLAMP
          ),
          opacity: interpolate(
            scrollY.value,
            [0, CATEGORY_MAX_HEIGHT - CATEGORY_MIN_HEIGHT],
            [1, 0.1],
            Extrapolate.CLAMP
          ),
        };
      });

    const renderPage = (type) => {
        const renderItem = type === 'topChart' ? renderTopChart : renderGame;
        return (
            <Animated.FlatList
                data={games}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text>No games available at the moment.</Text>
                }
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            />
        );
    };
    const handlePageChange = (event) => {
        setSelectedIndex(event.nativeEvent.position);
    };

    return (
        <View>
            <SectionComponent>
                <SpaceComponent height={40} />
                <RowComponent justify="space-between">
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Search home />
                    </TouchableOpacity>
                    <FontAwesomeIcon icon={faBell} size={24} color={appColors.white} />
                </RowComponent>
            </SectionComponent>
            <DividerComponent />

            <SectionComponent>
                <Animated.View style={heightStyle}>
                    <CategoriesItem index={selectedIndex}/>
                </Animated.View>
            </SectionComponent>

            <View style={{}}>
                <PagerView style={{ height: '100%', width: '100%' }} initialPage={0} onPageSelected={handlePageChange}>
                    <View key="1">{renderPage('game')}</View>
                    <View key="2">{renderPage('topChart')}</View>
                </PagerView>
            </View>
        </View>
    );
}

export default HomeScreen;