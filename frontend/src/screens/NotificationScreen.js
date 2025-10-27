import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const NotificationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
     <Ionicons name="chevron-back" size={28} color="#000" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Notifications</Text>

     
      <View style={styles.centerContainer}>
        <View style={styles.iconWrapper}>
          <Ionicons name="notifications" size={32} color="white" />
          <View style={styles.crossIcon}>
            <Ionicons name="close" size={18} color="#000" />
          </View>
        </View>

        <Text style={styles.mainText}>No messages yet</Text>

        <Text style={styles.subText}>
          Your activity on Luvsi has slowed{"\n"}sown recently. Interact with other{"\n"}luvsiers to increase your profile{"\n"}visibility.
        </Text>
      </View>

      
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate("UserProfileScreen")}
      >
        <Ionicons name="flash-outline" size={18} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.primaryBtnText}>Browse my profile</Text>
      </TouchableOpacity>

      
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("UserProfileScreen")}>
          <Ionicons name="home-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("HubScreen")}>
          <Ionicons name="grid-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
          <Ionicons name="map-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LikesScreen")}>
          <Ionicons name="heart-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
          <Ionicons name="chatbubble-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F4",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    fontFamily: "serif",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    position: "relative",
  },
  crossIcon: {
    position: "absolute",
    right: -4,
    top: -4,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 2,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 12,
  },
  subText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  primaryBtn: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
