import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "http://192.168.1.19:3000/"; 
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDM5NDhmNjQyMjcyYWNlNTA1Y2MzOSIsImlhdCI6MTc1ODY5NjYwOCwiZXhwIjoxNzU4NzgzMDA4fQ.pKuA6YNbUye0MPK8rPikokrjYTbzxbnsFp08bG8P3uU";

const PersonalityScreen = ({ navigation }) => {

  const handleSubmit = async () => {
    try {
      
      const keys = [
        "city","fullName","dob","gender","height","sign",
        "education","lookingFor","crush","favPlace",
        "smoke","kids","exercise","images"
      ];
      const values = await AsyncStorage.multiGet(keys);

      const userData = {};
      values.forEach(([key, value]) => {
        if (value !== null) {
          try { userData[key] = JSON.parse(value); } 
          catch { userData[key] = value; }
        }
      });

      console.log("📤 Data to send:", userData);

      
      let payload = new FormData();
      Object.keys(userData).forEach(key => {
        if (key === "images" && Array.isArray(userData.images)) {
          userData.images.forEach((img, index) => {
            let uri = img;
            if (Platform.OS === "android" && !uri.startsWith("file://")) uri = `file://${uri}`;
            payload.append("images", {
              uri,
              type: "image/jpeg",
              name: `image_${index}.jpg`
            });
          });
        } else {
          payload.append(key, typeof userData[key] === "object" ? JSON.stringify(userData[key]) : userData[key]);
        }
      });

      // ✅ Ensure email is included
      // if (!userData.email) payload.append("email", "portman@gmail.com");

      // 3️⃣ Set headers with token
      const headers = {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "multipart/form-data"
      };

     
      const res = await axios.post(`${BASE_URL}api/asif-user`, payload, { headers });
      console.log("✅ Backend Response:", res.data);

      if (res.data.success) {
        Alert.alert("Success", "Profile updated successfully!");

        
        setTimeout(() => {
          navigation.navigate("UserProfileScreen");
        }, 3000);

      } else {
        Alert.alert("Error", res.data.message || "Failed to update profile!");
      }

    } catch (err) {
      console.error(" API Error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to update profile. Check your network or token.");
    }
  };

  return (
    <View style={styles.container}>
    
      <Image
        source={require("../assets/personality.jpg")}
        style={styles.image}
        resizeMode="cover"
      />

      
      <View style={styles.textContainer}>
        <Text style={styles.title}>Personality goes a long way</Text>
        <Text style={styles.subtitle}>It’s your time to shine</Text>
      </View>


      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>I would describe myself as...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PersonalityScreen; 

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF8F5", justifyContent: "space-between", paddingBottom: 30 },
  image: { width: "100%", height: 300 },
  textContainer: { paddingHorizontal: 20, marginTop: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#000", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#555" },
  button: { backgroundColor: "#000", marginHorizontal: 20, paddingVertical: 15, borderRadius: 15, alignItems: "center" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
