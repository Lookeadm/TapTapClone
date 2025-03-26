import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, } from 'react-native';
import config from '../../apis/config';
import { ContainerComponent, DividerComponent, HeaderComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, TextComponent } from '../../components';
import { CommentComp, DownloadComponent, RatingComponent, ScreenshotComponent, UserRatingComponent } from './components';
import { appColors } from '../../constants/appColors';
import CategoryComponent from '../home/components/CategoriesItem';

const apiKey = config.API_KEY;
const urlGame = config.API_URL;

const DetailsScreen = ({ route }) => {
    const { game } = route.params;
    const [details, setDetails] = useState([]);
    const gameId = game.id;
    const urlDev = `${urlGame}/${gameId}?key=${apiKey}`;
    const genres = () => {
        try {
            return game.genres.slice(0, 3).map((genre, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextComponent
                        text={genre.name}
                        color={appColors.gray6}
                        size={12}
                    />
                    {index < 2 && <SeparatorComponent />}
                </View>
            ));
        } catch (error) {
            console.error('Error fetching genres:', error);
            return null;
        }
    }
    const screenshort = () => {
        try {
            const imageUrls = game.short_screenshots.map((screenshort) => {
                return screenshort.image; // Trả về URI hình ảnh
            });
            return imageUrls;
        } catch (error) {
            console.error('Error fetching screenshots:', error);
            return null;
        }
    }

    useEffect(() => {
        fetch(urlDev)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDetails(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const developer = () => {
        try {
            const developerList = details.developers.slice(0, 1);
            return developerList.map((developer, index) => (
                <View key={index}>
                    <TextComponent
                        text={developer.name}
                        color={appColors.gray6}
                        size={12}
                    />
                </View>
            ));
        } catch (error) {
            console.log('Error fetching developer:', error);
            return null;
        }
    }

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
                        <Image source={{ uri: game.background_image }} style={{ width: 70, height: 70, borderRadius: 15 }} />
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
                                <Image
                                    source={require('../../../assets/images/Android 1 (1).png')}
                                    style={{width: 24, height: 24}}
                                />
                                <Image
                                    source={require('../../../assets/images/Apple 1.png')}
                                    style={{width: 24, height: 24}}
                                />
                                <TextComponent
                                    text={genres()}
                                    color={appColors.gray6}
                                    size={12}
                                />
                            </RowComponent>
                            <TextComponent
                                size={12}
                                text={developer()}
                                color={appColors.gray6}
                                numberOfLines={1}
                                styles={{
                                    width: 180
                                }}
                            />
                        </View>
                    </RowComponent>
                    <TextComponent
                        text={details.description_raw}
                        numberOfLines={2}
                        color={appColors.gray5}
                        size={15}
                    />
                </SectionComponent>
                <DividerComponent />

                <SectionComponent>
                    <DownloadComponent/>
                </SectionComponent>

                <SectionComponent>
                    <CategoryComponent detail/>
                </SectionComponent>
                <DividerComponent />

                <SectionComponent>
                    <RatingComponent/>
                </SectionComponent>

                <SectionComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text='My Rating'
                            color={appColors.white}
                        />
                        <UserRatingComponent />
                    </RowComponent>
                </SectionComponent>
                <SectionComponent>
                    <CommentComp/>
                </SectionComponent>
            </View>
            </ScrollView>
        </View>
    );
};

export default DetailsScreen;