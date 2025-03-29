import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, } from 'react-native';
import { ContainerComponent, DividerComponent, HeaderComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, TextComponent } from '../../components';
import { CommentComp, DownloadComponent, RatingComponent, ScreenshotComponent, UserRatingComponent } from './components';
import { appColors } from '../../constants/appColors';
import CategoryComponent from '../home/components/CategoriesItem';
import AxiosInstance from '../../apis/AxiosInstance';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const DetailsScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [game, setGame] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchDetail = async () => {
            try {
                const res = await AxiosInstance().get(`/games/detail/${id}`);
                if (isMounted) {
                    setGame(res.data);
                }
            } catch (e) {
                console.log("Error: " + e);
            }
        };
        fetchDetail();
        return () => { isMounted = false; }; // Cleanup tránh lỗi khi unmount
    }, [id]);

    const genres = () => {
        if (!game.categories || game.categories.length === 0) {
            return null; // Tránh render lỗi nếu không có danh mục
        }

        return game.categories.map((category, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SeparatorComponent />
                <TextComponent text={category.name} color={appColors.gray6} size={12} />
            </View>
        ));
    };

    const screenshort = () => {
        if (!game.screenshot || game.screenshot.length === 0) {
            return []; // Trả về mảng rỗng nếu không có ảnh
        }
        return game.screenshot.map(screenshot => screenshot);
    };

    return (
        <View>
            <HeaderComponent back detail navigation />
            <ScrollView>
                <View>
                    <ScreenshotComponent images={screenshort()} />
                    <SpaceComponent height={15} />
                    <SectionComponent>
                        <RowComponent
                            styles={{ marginBottom: 10 }}>
                            <Image source={{ uri: game.avatar }} style={{ width: 70, height: 70, borderRadius: 15 }} />
                            <SpaceComponent width={15} />
                            <View>
                                <TextComponent
                                    size={16}
                                    text={game.name}
                                    fontWeight='bold'
                                    color={appColors.white}
                                    numberOfLines={1}
                                    styles={{
                                        width: '100%'
                                    }}
                                />
                                <RowComponent>
                                <FontAwesome name="apple" size={12} color={appColors.gray6} style={{ marginRight: 5 }} />
                                <FontAwesome name="android" size={12} color={appColors.gray6} style={{ marginRight: 5 }} />
                                    <TextComponent
                                        text={genres()}
                                        color={appColors.gray6}
                                        size={12}
                                    />
                                </RowComponent>
                                <TextComponent
                                    size={12}
                                    text={game.developer}
                                    color={appColors.gray6}
                                    numberOfLines={1}
                                    styles={{
                                        width: 180
                                    }}
                                />
                            </View>
                        </RowComponent>
                        <TextComponent
                            text={game.description}
                            numberOfLines={2}
                            color={appColors.gray5}
                            size={15}
                        />
                    </SectionComponent>
                    <DividerComponent />

                    <SectionComponent>
                        <DownloadComponent />
                    </SectionComponent>

                    <SectionComponent>
                        <CategoryComponent detail />
                    </SectionComponent>
                    <DividerComponent />

                    <SectionComponent>
                        <RatingComponent gameId={id} rating={game.averageRating}/>
                    </SectionComponent>

                    <SectionComponent>

                        <RowComponent justify="space-between">
                            <TextComponent text="My Rating" color={appColors.white} />
                            <UserRatingComponent
                                onPress={() => {
                                    navigation.navigate("Review", {
                                        id: game._id,
                                        avatar: game.avatar,
                                        name: game.name,
                                        categories: game.categories,
                                    });
                                }}
                            />
                        </RowComponent>

                    </SectionComponent>
                    <SectionComponent>
                        <CommentComp gameId={id} />
                    </SectionComponent>
                </View>
            </ScrollView>
        </View>
    );
};

export default DetailsScreen;