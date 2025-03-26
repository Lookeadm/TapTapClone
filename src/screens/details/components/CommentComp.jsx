import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const appColors = {
  white: '#FFFFFF',
  gray: '#A9A9A9',
  gray6: '#666666',
  green: '#00C853',
  darkBg: '#121212',
};

const initialComments = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'This event was amazing! I had a great time.',
    time: '2 hours ago',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'Loved the atmosphere and the people!',
    time: '5 hours ago',
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSendComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObj = {
      id: Date.now().toString(),
      name: 'You', // Giả định người dùng hiện tại
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      content: newComment,
      time: 'Just now',
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  return (
    <View style={{backgroundColor: appColors.darkBg, flex: 1 }}>
      {/* Tiêu đề */}
      <Text style={{ color: appColors.white, fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}>
        Comments
      </Text>

      {/* Danh sách bình luận */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            {/* Avatar */}
            <Image
              source={{ uri: item.avatar }}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            />

            {/* Nội dung bình luận */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: appColors.white, fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ color: appColors.gray6, marginBottom: 3 }}>{item.content}</Text>
              <Text style={{ color: appColors.gray, fontSize: 12 }}>{item.time}</Text>
            </View>
          </View>
        )}
      />

      {/* Ô nhập bình luận */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: appColors.gray6,
          paddingTop: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            backgroundColor: '#1E1E1E',
            color: appColors.white,
            padding: 10,
            borderRadius: 20,
          }}
          placeholder="Write a comment..."
          placeholderTextColor={appColors.gray}
          value={newComment}
          onChangeText={setNewComment}
        />

        <TouchableOpacity onPress={handleSendComment} style={{ marginLeft: 10 }}>
          <AntDesign name="arrowright" size={24} color={appColors.green} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentSection;
