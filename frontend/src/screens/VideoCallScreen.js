import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const VideoCallScreen = ({ route, navigation }) => {
  const { withUserId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Video Call with User: {withUserId}</Text>
      <TouchableOpacity style={styles.endBtn} onPress={() => navigation.goBack()}>
        <Text style={{ color: "#fff", fontSize: 16 }}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  text: { color: "#fff", fontSize: 20, marginBottom: 20 },
  endBtn: { padding: 12, backgroundColor: "red", borderRadius: 8 },
});

export default VideoCallScreen;
