// export default PersonalityScreen;
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Svg, { Path, ClipPath, Defs } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PersonalityScreen = ({ navigation }) => {
  const handleSubmit = async () => {
    try {
      // ✅ AsyncStorage se data nikaalna
      const city = await AsyncStorage.getItem("city");
      const name = await AsyncStorage.getItem("name");
      const dob = await AsyncStorage.getItem("dob");
      const gender = await AsyncStorage.getItem("gender");
      const height = await AsyncStorage.getItem("height");
      const sign = await AsyncStorage.getItem("sign");
      const education = await AsyncStorage.getItem("education");
      const lookingFor = await AsyncStorage.getItem("lookingFor");
      const crush = await AsyncStorage.getItem("crush");
      const favPlace = await AsyncStorage.getItem("favPlace");

      // ✅ Null & stringified values ko fix karna
      const userData = {
        city: city || "",
        name: name || "",
        dob: dob || "",
        gender: gender || "",
        height: height || "",
        sign: sign || "",
        education: education || "",
        lookingFor: lookingFor || "",
        crush: crush || "",
        favPlace: favPlace ? JSON.parse(favPlace) : [], // 👈 string → array
      };

      console.log("📌 Sending data:", userData);

      // ✅ API call
      const res = await axios.post("http://10.0.2.2:3000/api/asif-user", userData);

      if (res.data.success) {
        Alert.alert("✅ Success", "Data saved successfully!");
        navigation.navigate("ExerciseScreen");
      } else {
        Alert.alert("⚠️ Error", res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("❌ API ERROR:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to save data");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.imageWrapper}>
        <Svg height="250" width="100%" style={styles.svg}>
          <Defs>
            <ClipPath id="clip">
              <Path d="M0 0 H400 V200 C300 250,100 150,0 250 Z" fill="black" />
            </ClipPath>
          </Defs>
          <Image
            source={require("../assets/personality.jpg")}
            style={styles.image}
            resizeMode="cover"
            clipPath="url(#clip)"
          />
        </Svg>
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Personality goes a long way</Text>
        <Text style={styles.subtitle}>It’s your time to shine</Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>I would describe myself as...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF8F5", justifyContent: "space-between", paddingBottom: 30 },
  imageWrapper: { position: "relative", width: "100%", height: 250 },
  svg: { position: "absolute", width: "100%", height: "100%" },
  image: { width: "100%", height: "100%" },
  textContainer: { paddingHorizontal: 20, marginTop: 30 },
  title: { fontSize: 28, fontWeight: "bold", color: "#000", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#555" },
  button: { backgroundColor: "#000", marginHorizontal: 20, paddingVertical: 15, borderRadius: 15, alignItems: "center" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default PersonalityScreen;
