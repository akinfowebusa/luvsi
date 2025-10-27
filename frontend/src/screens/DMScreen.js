import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function DMScreen() {
  const navigation = useNavigation();

  const [conversations, setConversations] = useState([
    {
      _id: "chat1",
      participants: [
        { _id: "68d65fe53fd83e67fe99826a", fullName: "Portman", images: [""] },
        { _id: "user2", fullName: "Alice", images: ["https://via.placeholder.com/150/FF0000"] }
      ],
      messages: [
        { sender: "user2", text: "Hey Portman, how are you?" },
        { sender: "68d65fe53fd83e67fe99826a", text: "I'm good, thanks!" }
      ]
    },
    {
      _id: "chat2",
      participants: [
        { _id: "68d65fe53fd83e67fe99826a", fullName: "Portman", images: ["https://via.placeholder.com/150"] },
        { _id: "user3", fullName: "Bob", images: ["https://via.placeholder.com/150/00FF00"] }
      ],
      messages: [
        { sender: "user3", text: "Hello!" }
      ]
    },
    {
      _id: "chat3",
      participants: [
        { _id: "68d65fe53fd83e67fe99826a", fullName: "Portman", images: ["https://via.placeholder.com/150"] },
        { _id: "user4", fullName: "Charlie", images: ["https://via.placeholder.com/150/0000FF"] }
      ],
      messages: []
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const currentUserId = "68d65fe53fd83e67fe99826a";

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); 
  };

  const MessageRow = ({ item }) => {
    const otherUser = item.participants.find(p => p._id !== currentUserId);
    const lastMessage = item.messages?.length > 0
      ? item.messages[item.messages.length - 1].text
      : "No messages yet";

    return (
      <TouchableOpacity
        style={styles.messageRow}
        onPress={() => navigation.navigate('MessageScreen', { chatId: item._id, user: otherUser })}
      >
        <Image
          source={{ uri: otherUser?.images?.[0] || "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <View style={styles.messageContent}>
          <Text style={styles.nameText}>{otherUser?.fullName || "Unknown User"}</Text>
          <Text style={styles.timeText}>{lastMessage}</Text>
        </View>
        <Ionicons name="camera" size={25} color="#fff" />
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.usernameText}>Messages</Text>
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="create" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MessageRow item={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No conversations found</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFC0CB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#1A1A1A',
  },
  leftHeader: { flexDirection: 'row', alignItems: 'center' },
  usernameText: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginHorizontal: 8 },
  rightHeader: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { marginLeft: 20 },
  messageRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12 },
  profileImage: { width: 55, height: 55, borderRadius: 27.5 },
  messageContent: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  nameText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  timeText: { color: '#8A8A8E', fontSize: 14 },
  emptyText: { color: '#fff', textAlign: 'center', marginTop: 20, fontSize: 16 },
});
