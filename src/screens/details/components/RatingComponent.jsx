import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AxiosInstance from '../../../apis/AxiosInstance';

const appColors = {
  white: '#FFFFFF',
  gray: '#A9A9A9',
  gray6: '#666666',
  green: '#00C853', // Màu xanh cho nút "Write a review"
};

const RatingOverviewComponent = ({
  gameId,
  rating
}) => {
  const [reviews, setReviews] = useState([]);

  useEffect(()=>{
    const fetchReviews = async () => {
      try {
        const response = await AxiosInstance().get(`/previewGame/${gameId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [gameId]);

  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const totalReviews = reviews.length;

  const ratingPercentage = Object.entries(ratingCounts).map(([rating, count]) => ({
    rating: Number(rating),
    percentage: ((count / totalReviews) * 100).toFixed(0)
  }));
  console.log(reviews);
  
  return (
    <View style={{backgroundColor: '#121212' }}>
      {/* Tiêu đề */}
      <Text style={{ color: appColors.white, fontSize: 17, fontWeight: 'bold' }}>
        Ratings & Reviews
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        {/* Điểm số trung bình */}
        <View style={{ marginRight: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 50, color: appColors.white, fontWeight: 'bold' }}>
              {rating}
            </Text>
            <Text style={{ fontSize: 17, color: appColors.gray6 }}> /5</Text>
          </View>
          <Text style={{ fontSize: 13, color: appColors.gray6 }}>{totalReviews} Ratings</Text>
        </View>

        {/* Bảng tỷ lệ đánh giá */}
        <View style={{ flex: 1 }}>
          {ratingPercentage.map(({ rating, percentage }) => (
            <View key={rating} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              {/* Hiển thị số sao từ phải qua trái */}
              <View style={{ flexDirection: 'row-reverse', width: 80, marginRight: 5 }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <AntDesign
                    key={i}
                    name={i < rating ? 'star' : ''}
                    size={11}
                    color={appColors.gray6}
                  />
                ))}
              </View>
              {/* Thanh progress bar */}
              <View
                style={{
                  height: 6,
                  flex: 1,
                  backgroundColor: '#333',
                  borderRadius: 3,
                  overflow: 'hidden',
                  marginRight: 10, // Đẩy progress bar sang trái
                }}
              >
                <View
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: appColors.gray,
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Nút "Write a review" */}
      <TouchableOpacity style={{ marginTop: 10 }}>
        <Text style={{ color: appColors.green, fontSize: 14, fontWeight: 'bold' }}>
          + Write a review
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RatingOverviewComponent;
