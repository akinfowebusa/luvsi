import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const LikesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Likes</Text>

      
      <View style={styles.centerContainer}>
        <View style={styles.iconWrapper}>
          <Ionicons name="eye-outline" size={32} color="white" />
        </View>

        <Text style={styles.mainText}>
          It won’t be long before {"\n"} you catch someone’s {"\n"} attention
        </Text>

        <Text style={styles.subText}>
          In the meantime, {"\n"} boost your profile visibility to get your first Likes!
        </Text>
      </View>

      
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate("BoostMyProfile")}
      >
        <Text style={styles.primaryBtnText}>Boost my profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn}  onPress={() => navigation.navigate("ProfileDashboard")}>
        <Text style={styles.secondaryBtnText}>Improve my profile</Text>
      </TouchableOpacity>

      
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("UserProfileScreen")}>
          <Ionicons name="home-outline" size={22} color="#964B00" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("HubScreen")}>
          <Ionicons name="grid-outline" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
          <Ionicons name="map-outline" size={22} color="#4cef0cff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LikesScreen")}>
          <Ionicons name="heart-outline" size={22} color="#de0d0dff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
          <Ionicons name="chatbubble-outline" size={22} color="#3139cfff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LikesScreen;

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
  },
  mainText: {
    fontSize: 18,
    fontWeight: "600",
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
    marginBottom: 12,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryBtn: {
    backgroundColor: "#EAE7E2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  secondaryBtnText: {
    color: "#000",
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
