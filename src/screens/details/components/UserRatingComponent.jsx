import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appColors } from '../../../constants/appColors';

const UserRatingComponent = ({
  quantity,
  size,
  mini,
  onChangeRating,
  onPress
}) => {
  const [rating, setRating] = useState(quantity ? quantity : 0);

  const handleRating = (value) => {
    setRating(value);
    if (onChangeRating) {
      onChangeRating(value); // Gửi giá trị rating ra component cha
    }
    else if(onPress){
      onPress(value);
    }
  };

  return (
    <View 
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        width: mini ? 60 : 200,
        justifyContent: 'space-around',
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity 
          key={star} 
          activeOpacity={mini ? 1 : 0.7}
          onPress={() => {
            if (!mini) {
              handleRating(star);
            }
          }}
        >
          <AntDesign 
            name={star <= rating ? "star" : "staro"}
            size={size ? size : 30} 
            color={star <= rating ? appColors.white : appColors.gray} // Vàng khi chọn, xám khi chưa chọn
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default UserRatingComponent;
