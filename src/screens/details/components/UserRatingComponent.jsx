import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UserRatingComponent = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <View 
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        width: 200,
        justifyContent: 'space-around',
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity 
          key={star} 
          activeOpacity={0.7}
          onPress={() => handleRating(star)}
        >
          <AntDesign 
            name={star <= rating ? "star" : "staro"}
            size={30} 
            color={star <= rating ? '#FFD700' : '#A9A9A9'} // Vàng khi chọn, xám khi chưa chọn
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UserRatingComponent;
