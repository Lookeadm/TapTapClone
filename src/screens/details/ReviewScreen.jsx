import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserRatingComponent } from './components';
import { ButtonComponent, RowComponent, SectionComponent, SeparatorComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import AxiosInstance from '../../apis/AxiosInstance';
import { useNavigation } from '@react-navigation/native';
import { LoadingModal } from '../../modals';

const ReviewScreen = ({route}) => {
    const [ratingFinal, setRatingFinal] = useState(4);
    const [imageUri, setImageUri] = useState(null);
    const [comment, setComment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const auth = useSelector(authSelector);
    const { id, avatar, name, categories } = route.params;

    const navigation = useNavigation();

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "withershop");

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dot3j50a9/image/upload",
                formData
            );
            return response.data.secure_url;
        } catch (error) {
            console.error('Upload error:', error);
            throw new Error('Lỗi khi tải ảnh lên');
        }
    };

    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };
    const removeImage = () => {
        setImageUri(null);
    };
    const genres = () => {
        if (!categories || categories.length === 0) {
            return null; // Tránh render lỗi nếu không có danh mục
        }

        return categories.map((category, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextComponent text={category.name} color={appColors.gray6} size={12} />
                <SeparatorComponent />
            </View>
        ));
    };

    const handlePublish = async () => {
        setIsLoading(true);
        const body = {
            userId: auth.id,
            gameId: id,
            comment: comment,
            rating: ratingFinal,
        }
        console.log(body);
        
        try {
            const publish = await AxiosInstance().post("/previewGame/post", body);
            if (publish.status == true) {
                navigation.goBack();
            }
            else {
                console.log("Post failure");
            }
            setIsLoading(false);
        } catch (e) {
            console.log("Error" + e);
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <SectionComponent>
                <RowComponent justify={"space-between"}>
                    <TouchableOpacity>
                        <Icon name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.publishButton} onPress={()=>handlePublish()}>
                        <TextComponent text={"Publish"} color={appColors.black} size={13} fontWeight={'bold'} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>

            {/* Game Info */}
            <View style={styles.gameInfo}>
                <Image source={{ uri: avatar }} style={styles.gameIcon} />
                <View>
                    <Text style={styles.gameTitle}>{name}</Text>
                    <TextComponent
                        text={genres()}
                        color={appColors.gray6}
                        size={12}
                    />
                </View>
            </View>
            <SectionComponent>
                <RowComponent>
                    <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Wishlist</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.activeButton]}><Text style={styles.buttonTextActive}>Played</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Playing</Text></TouchableOpacity>
                </RowComponent>
            </SectionComponent>

            {/* Rating */}
            <SectionComponent>
                <TextComponent text={"Give a rating (required)"} color={appColors.white} fontWeight={'bold'} />
                <SpaceComponent height={10} />
                <UserRatingComponent />
            </SectionComponent>
            <SpaceComponent height={20} />
            <SectionComponent>
                <RowComponent>
                    {/* Review Input */}
                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                        ) : (
                            <Icon name="image" size={50} color="#888" />
                        )}
                    </TouchableOpacity>
                    {imageUri && (
                        <TouchableOpacity style={styles.remove} onPress={removeImage}>
                            <Icon name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                    )}
                </RowComponent>
                <TextInput
                    style={styles.input}
                    placeholder="Write your legendary review here"
                    placeholderTextColor="#888"
                    multiline
                    onChangeText={value=>{
                        setComment(value);
                    }}
                />
            </SectionComponent>
            <LoadingModal visible={isLoading}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 35
    },
    publishButton: {
        width: 70,
        height: 25,
        borderRadius: 15,
        backgroundColor: appColors.green,
        justifyContent: 'center',
        alignItems: 'center',

    },
    gameInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    gameIcon: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    gameTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    gameCategory: {
        color: '#bbb',
        fontSize: 14,
    },
    button: {
        width: 70,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#333',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeButton: {
        backgroundColor: '#116530',
    },
    imagePicker: {
        minHeight: 10,
        maxHeight: 100,
        borderRadius: 5,
        marginBottom: 20,
    },
    selectedImage: {
        width: 100,
        height: '100%',
        borderRadius: 5,
    },
    remove: {
        backgroundColor: appColors.green,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 90,
        marginLeft: 10
    },
    input:{
        color: appColors.white
    }
});

export default ReviewScreen;
