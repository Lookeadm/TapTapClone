import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';
import { appColors } from '../../../constants/appColors';

const ScreenshotComponent = ({
    images
}) => {

  return (
    <View
        style={{
            height: 220
        }}
    >
      <Swiper
        showsPagination={true} // Hiển thị chấm phân trang
        loop={true} // Lặp lại carousel
        activeDotColor={appColors.gray} // Màu chấm phân trang đang hoạt động
        dotStyle={styles.dot} // Style chấm phân trang
        activeDotStyle={styles.activeDot} // Style chấm hoạt động
        paginationStyle={styles.pagination}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image 
              source={{ uri: image }} 
              style={styles.image} 
            />
          </View>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
    imageWrapper: {
      borderRadius: 10,
      overflow: 'hidden',
      width: '100%',
      height: 220,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    dot: {
      backgroundColor: '#A3A3A3',
      width: 4,
      height: 4,
      borderRadius: 4,
      marginTop: 10
    },
    activeDot: {
      backgroundColor: '#fcfcfc',
      width: 5,
      height: 5,
      borderRadius: 5,
      marginTop: 10
    },
    pagination: {
        bottom: 10, // Điều chỉnh vị trí của chấm phân trang (âm để đưa xuống dưới)
      },
  });
export default ScreenshotComponent