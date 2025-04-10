import React, { useEffect, useRef, useState } from 'react';
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
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);  // For loading state

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(appInfo.BASE_URL, {
      transports: ["websocket"],
    });

    // Lắng nghe sự kiện 'newPost'
    socketRef.current.on("newPost", (data) => {
      if (data.post.gameId === gameId) {
        setReviews((prevReviews) => [data.post, ...prevReviews]);
        setMessages((prevMessages) => [...prevMessages, data.post]);
      }
    });

    // Dọn dẹp khi component bị hủy
    return () => {
      socketRef.current.disconnect();
    };
  }, [gameId]); // Added gameId dependency

  useEffect(() => {
    fetchReviews();
  }, [gameId]);

  const fetchReviews = async () => {
    try {
      const response = await AxiosInstance().get(`/previewGame/${gameId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);  // Stop loading state after fetch
    }
  };

  const formatDate = (createdDate) => {
    const date = new Date(createdDate);
    const formattedDate = date.toLocaleDateString("vi-VN");
    return formattedDate;
  }

  console.log("New Post: " + JSON.stringify(messages));
  console.log("Review: " + JSON.stringify(reviews));
  
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

      {loading ? (
        <Text style={{ color: appColors.gray, textAlign: 'center' }}>
          Loading comments...
        </Text>
      ) : reviews.length === 0 ? (
        <Text style={{ color: appColors.gray, textAlign: 'center' }}>
          No comments yet
        </Text>
      ) : (
        reviews.map(item => (
          <View style={styles.container} key={item._id}>
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

      {/* Optionally render the messages */}
      {messages.length > 0 && (
        <View>
          <Text style={{ color: appColors.white, marginTop: 20 }}>New Posts:</Text>
          {messages.map((message, index) => (
            <Text key={index} style={{ color: appColors.white }}>
              {message.text} {/* Assuming "message.text" holds the content */}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.gray7,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  }
});
