import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const UserRatingComponent = () => {
  const [rating, setRating] = useState(0)

  const handleRating = (value) => {
    setRating(value)
  }

  return (
    <View 
        style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            width: 200,
            justifyContent: 'space-around',
        }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity 
            key={star} 
            activeOpacity={1}
            onPress={() => handleRating(star)}
        >
          <AntDesign 
            name={star <= rating ? "star" : "staro"}
            size={30} 
            color={star <= rating ? 'white' : 'gray'}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default UserRatingComponent