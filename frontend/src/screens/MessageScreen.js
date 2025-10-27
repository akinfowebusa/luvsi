import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  StyleSheet,
  Linking,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Ionicons from "react-native-vector-icons/Ionicons";
import io from 'socket.io-client';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCSessionDescription,
  RTCIceCandidate,
} from "react-native-webrtc";

const BASE_URL = 'http://192.168.1.34:3000/'; 

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const MessageScreen = ({ route, navigation }) => {
  const { chatId, withUserId, token: routeToken, currentUserId } = route.params || {};
  const TOKEN = routeToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDY1ZmU1M2ZkODNlNjdmZTk5ODI2YSIsImlhdCI6MTc2MTE5ODU2MSwiZXhwIjoxNzYxMjg0OTYxfQ.4_PLFXfEgfkwL_H3aKfUJtrljy3nzbbKxwZo4k4DKVo";

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([]);  
  const [text, setText] = useState('');
  const [chatMeta, setChatMeta] = useState(null); 


  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [pc, setPc] = useState(null);
  const [inCall, setInCall] = useState(false);

  const socketRef = useRef(null);
  const flatRef = useRef(null);

  useEffect(() => {
    fetchConversation();
    initSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (pc) pc.close();
    };
  }, []);

  const fetchConversation = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}api/conversation`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        params: chatId ? { chatId } : { withUserId },
      });
      if (res.data && res.data.success) {
        const chat = res.data.data;
        setChatMeta(chat);
        const msgs = Array.isArray(chat.messages) ? chat.messages.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) : [];
        setMessages(msgs);
        setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 200);
      }
    } catch (err) {
      console.error('fetchConversation error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const initSocket = () => {
    const socket = io(BASE_URL, {
      transports: ['websocket'],
      auth: { token: TOKEN }, 
      autoConnect: true,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('auth', { token: TOKEN });
      if (chatMeta && chatMeta._id) socket.emit('join_chat', { chatId: chatMeta._id });
    });

  
    socket.on("call-made", async (data) => {
      console.log("Incoming call from:", data.from);
      await acceptCall(data);
    });

    socket.on("answer-made", async (data) => {
      console.log("Answer received");
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    socket.on("ice-candidate", async (data) => {
      try {
        if (pc) await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (err) {
        console.error("Error adding ice candidate", err);
      }
    });

    socket.on('chat:new_message', (payload) => {
      if (!payload) return;
      const incoming = payload.message || payload;
      setMessages((prev) => {
        const exists = prev.some((m) => (m._id && m._id === incoming._id));
        if (exists) return prev;
        const next = prev.concat(incoming);
        next.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        return next;
      });
      setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
    });
  };

  
  const handleSend = async () => {
    if (!text.trim()) return;
    const payloadText = text.trim();
    setSending(true);
    setText('');
    try {
      const temp = {
        _id: `temp-${Date.now()}`,
        sender: currentUserId || 'me',
        text: payloadText,
        createdAt: new Date().toISOString(),
        read: false,
      };
      setMessages((prev) => [...prev, temp]);

      const body = { toUserId: withUserId, text: payloadText, chatId: chatMeta?._id };
      const res = await axios.post(`${BASE_URL}api/chat/send`, body, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      if (res.data && res.data.success) {
        const returned = res.data.data?.message || res.data.data;
        if (returned) {
          setMessages((prev) => [...prev.filter((m) => !m._id.startsWith('temp-')), returned]);
        }
        if (socketRef.current) {
          socketRef.current.emit('send_message', { chatId: chatMeta?._id, message: returned, recipientId: withUserId });
        }
      }
    } catch (err) {
      console.error('send message error:', err.response?.data || err.message);
    } finally {
      setSending(false);
    }
  };


  const handleVideoCall = async () => {
    if (!withUserId) return Alert.alert("Error", "User not available");
    setInCall(true);

    const peer = new RTCPeerConnection(configuration);
    setPc(peer);

    const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
    setLocalStream(stream);
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    peer.ontrack = (event) => setRemoteStream(event.streams[0]);
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", { to: withUserId, candidate: event.candidate });
      }
    };

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socketRef.current.emit("call-user", { to: withUserId, offer, from: currentUserId });
  };

 
  const handlePhoneCall = async () => {
    if (!withUserId) return Alert.alert("Error", "User not available");
    setInCall(true);

    const peer = new RTCPeerConnection(configuration);
    setPc(peer);

    const stream = await mediaDevices.getUserMedia({ audio: true, video: false });
    setLocalStream(stream);
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    peer.ontrack = (event) => setRemoteStream(event.streams[0]);
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", { to: withUserId, candidate: event.candidate });
      }
    };

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socketRef.current.emit("call-user", { to: withUserId, offer, from: currentUserId });
  };

  
  const acceptCall = async (data) => {
    setInCall(true);
    const peer = new RTCPeerConnection(configuration);
    setPc(peer);

    const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
    setLocalStream(stream);
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    peer.ontrack = (event) => setRemoteStream(event.streams[0]);
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", { to: data.from, candidate: event.candidate });
      }
    };

    await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    socketRef.current.emit("make-answer", { answer, to: data.from });
  };

  const renderItem = ({ item }) => {
    const isMe = item.sender?.toString() === currentUserId?.toString();
    return (
      <View style={[styles.msgRow, isMe ? styles.msgRight : styles.msgLeft]}>
        {!isMe && item.senderProfile?.avatar && <Image source={{ uri: item.senderProfile.avatar }} style={styles.avatar} />}
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          <Text style={[styles.msgText, isMe ? styles.msgTextMe : styles.msgTextOther]}>{item.text}</Text>
          <Text style={styles.msgTime}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="chevron-back" size={28} color="black" style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>{chatMeta?.participants ? 'Chat' : 'Conversation'}</Text>
        <View style={styles.callIcons}>
          <TouchableOpacity onPress={handleVideoCall} style={styles.iconBtn}>
            <Ionicons name="videocam-outline" size={24} color="#5544A3" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePhoneCall} style={styles.iconBtn}>
            <Ionicons name="call-outline" size={24} color="#5544A3" />
          </TouchableOpacity>
        </View>
      </View>

      {inCall ? (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          {localStream && (
            <RTCView
              streamURL={localStream.toURL()}
              style={{ width: 100, height: 150, position: "absolute", top: 10, right: 10 }}
            />
          )}
          {remoteStream && (
            <RTCView streamURL={remoteStream.toURL()} style={{ flex: 1 }} />
          )}
        </View>
      ) : loading ? (
        <View style={styles.loader}><ActivityIndicator size="large" color="#5544A3" /></View>
      ) : (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
          <FlatList
            ref={flatRef}
            data={messages}
            keyExtractor={(item) => item._id || item.createdAt}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 12 }}
            onContentSizeChange={() => flatRef.current?.scrollToEnd({ animated: true })}
          />
          <View style={styles.composer}>
            <TextInput value={text} onChangeText={setText} placeholder="Type a message..." style={styles.input} multiline />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={sending}>
              <Ionicons name='send' color={'#fff'}/>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9F9F9' },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
  back: { width: 60 },
  title: { fontSize: 16, fontWeight: '700', color: '#000' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  msgRow: { flexDirection: 'row', marginVertical: 6, alignItems: 'flex-end' },
  msgLeft: { justifyContent: 'flex-start' },
  msgRight: { justifyContent: 'flex-end' },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  bubble: { maxWidth: '80%', padding: 10, borderRadius: 12 },
  bubbleMe: { backgroundColor: '#5544A3', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  bubbleOther: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee' },
  msgText: { fontSize: 15 },
  msgTextMe: { color: '#fff' },
  msgTextOther: { color: '#000' },
  msgTime: { fontSize: 10, color: '#999', marginTop: 6, textAlign: 'right' },
  composer: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff', alignItems: 'flex-end' },
  input: { flex: 1, minHeight: 40, maxHeight: 120, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#f2f2f2', borderRadius: 20 },
  sendBtn: { marginLeft: 8, backgroundColor: '#5544A3', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, justifyContent: 'center' },
  backArrow: { fontSize: 22, fontWeight: "bold" },
  callIcons: { flexDirection: 'row', width: 80, justifyContent: 'space-between', alignItems: 'center' },
  iconBtn: { padding: 4 },
});

export default MessageScreen;
