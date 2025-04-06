import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { AppItem, Categories, CategoriesItem, Search } from './components';
import { DividerComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, TextComponent } from '../../components';
import SwiperGames from './components/SwiperGames';
import CardGames from './components/CardGames';
import { appColors } from '../../constants/appColors';
import PagerView from 'react-native-pager-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Animated, {useSharedValue, withTiming, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate, useDerivedValue} from 'react-native-reanimated'
import AxiosInstance from '../../apis/AxiosInstance';


const CATEGORY_MAX_HEIGHT = 50;
const CATEGORY_MIN_HEIGHT = 5;

const HomeScreen = ({ navigation }) => {
    const [games, setGames] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const scrollY = useSharedValue(0);

    useEffect(() => {
        const fetchGames = async() => {
            setIsLoading(true);
            try{
                const games = await AxiosInstance().get("/games/all");
                setGames(games.data);
            }catch(e){
                console.log("Lấy game thất bại", e);
            }
            finally{
                setIsLoading(false);
            }
        }
        fetchGames();
    }, []);

    const renderHorizontalGames = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { id: item._id })}
            activeOpacity={1}
        >
            <AppItem
                title={item.name}
                image={item.avatar}
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
                        keyExtractor={(game) => game._id.toString()}
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
                onPress={() => navigation.navigate('Detail', { id: item._id })}
                activeOpacity={1}
            >
                <CardGames
                    title={item.name}
                    image={item.avatar}
                    background={item.background}
                    rating={item.averageRating}
                    description={item.description}
                    genres={item.categories}
                />
            </TouchableOpacity>
        );
    };
    const renderTopChart = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Detail', { id: item._id })}
                activeOpacity={1}
            >
                <CardGames
                    topChart
                    number={index + 1}
                    title={item.name}
                    image={item.avatar}
                    rating={item.averageRating}
                    genres={item.categories.slice(0, 2).map((genre, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextComponent
                                text={genre.name}
                                color={appColors.gray6}
                                size={12}
                            />
                            {index < item.categories.slice(0, 2).length - 1 && <SeparatorComponent />}
                        </View>
                    ))}
                />
            </TouchableOpacity>
        );
    }

    const renderPage = (type) => {
        const renderItem = type === 'topChart' ? renderTopChart : renderGame;
        return (
            <Animated.FlatList
                data={games}
                keyExtractor={(item) => item._id.toString()}
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