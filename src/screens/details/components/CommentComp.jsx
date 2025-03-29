import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { io } from "socket.io-client";
import { appInfo } from '../../../constants/appInfos';
import AxiosInstance from '../../../apis/AxiosInstance';
import { appColors } from '../../../constants/appColors';
import { RowComponent, TextComponent } from '../../../components';
import { RatingComponent, UserRatingComponent } from '.';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CommentSection = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await AxiosInstance().get(`/previewGame/${gameId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const formatDate = (createdDate) => {
    const date = new Date(createdDate);
    const formattedDate = date.toLocaleDateString("vi-VN");
    return formattedDate;
  }

  return (
    <View>
      <Text style={{
        color: appColors.white,
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10
      }}>
        Comments
      </Text>

      {reviews.length === 0 ? (
        <Text style={{
          color: appColors.gray,
          textAlign: "center"
        }}>
          No comments yet
        </Text>
      ) : (
        reviews.map(item => (
          <View style={styles.conatainer}>
            <RowComponent justify={"space_between"} styles={{ marginBottom: 10 }}>
              <RowComponent>
                <Image
                  source={{ uri: item.userId.picUrl }}
                  style={{ width: 30, height: 30, borderRadius: 20, marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: appColors.white, fontWeight: 'bold' }}>
                    {item.userId.username}
                  </Text>
                </View>
                <TouchableOpacity>
                  <MaterialIcons name="more-vert" size={24} color={'white'} />
                </TouchableOpacity>
              </RowComponent>
            </RowComponent>
            <RowComponent>
              <UserRatingComponent size={10} mini quantity={item.rating} />
              <TextComponent text={formatDate(item.createdAt)} size={12} color={appColors.white} styles={{ marginLeft: 10 }} />
            </RowComponent>
            <Text style={{ color: appColors.gray6, marginBottom: 3 }}>
              {item.comment}
            </Text>
          </View>
        ))
      )}
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  conatainer: {
    backgroundColor: appColors.gray7,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  }
})