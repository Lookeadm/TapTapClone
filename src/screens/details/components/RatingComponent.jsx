import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const appColors = {
  white: '#FFFFFF',
  gray: '#A9A9A9',
  gray6: '#666666',
  green: '#00C853', // Màu xanh cho nút "Write a review"
};

const ratingData = [
  { stars: 5, percentage: 80 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 2 },
];

const RatingOverviewComponent = () => {
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
              8.2
            </Text>
            <Text style={{ fontSize: 17, color: appColors.gray6 }}> /10</Text>
          </View>
          <Text style={{ fontSize: 13, color: appColors.gray6 }}>482 Ratings</Text>
        </View>

        {/* Bảng tỷ lệ đánh giá */}
        <View style={{ flex: 1 }}>
          {ratingData.map(({ stars, percentage }) => (
            <View key={stars} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              {/* Hiển thị số sao từ phải qua trái */}
              <View style={{ flexDirection: 'row-reverse', width: 80, marginRight: 10 }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <AntDesign
                    key={i}
                    name={i < stars ? 'star' : 'staro'}
                    size={12}
                    color={appColors.gray}
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
