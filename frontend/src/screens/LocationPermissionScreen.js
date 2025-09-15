import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const LocationPermissionScreen = () => {
  const navigation = useNavigation();

  const handleEnableLocation = () => {
    // 👉 yaha pe location permission logic add karna hoga
    navigation.navigate("NextScreen"); // next page navigation
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Image Section */}
      <View style={styles.imageWrapper}>
        <Image
          source={require("../assets/locationBanner.jpg")} // apna banner image yaha daalna
          style={styles.banner}
          resizeMode="cover"
        />
      </View>

      {/* Title & Subtitle */}
      <Text style={styles.title}>See who you crossed paths with</Text>
      <Text style={styles.subtitle}>
        Select <Text style={{ fontWeight: "bold" }}>“While using the app”</Text>{" "}
        to see your future Crushes. Don’t worry, others will never see your
        real-time location.
      </Text>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleEnableLocation}
        >
          <Text style={styles.continueText}>Enable location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.privacyWrapper}>
          <Icon name="shield-checkmark" size={18} color="#000" />
          <Text style={styles.privacyText}> Our privacy commitments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF4EF", // ✅ Same pinkish background
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  imageWrapper: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  banner: {
    width: "100%",
    height: 160,
    borderRadius: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E8E",
    marginBottom: 30,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#F06292", // ✅ Pink button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  continueText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  privacyWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  privacyText: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
  },
});
