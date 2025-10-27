// import React, { useEffect, useState, useRef } from "react";
// import { View, Text, StyleSheet, Animated, Alert } from "react-native";
// import Video from "react-native-video";
// import { getItem } from "../utils/storage"; 
// import API from "../utils/api"; 
// const PleasureScreen = ({ navigation }) => {
//   const [showText, setShowText] = useState(false);
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const sendDataToAPI = async () => {
//       try {
        
//         const city = await getItem("City");
//         const name = await getItem("Name");
//         const dob = await getItem("DateOfBirth");
//         const gender = await getItem("Gender");
//         const height = await getItem("Height");
//         const sign = await getItem("Sign");
//         const education = await getItem("Education");

        
//         const payload = {
//           fullName: name,
//           city: city,
//           email: "test100@example.com",
//           phone: "9999999999",
//           gender: gender,
//           dateOfBirth: dob,
//           sign: sign,
//           height: height,
//           education: education,
//           location: city,
//           password: "123456", 
//         };

//         console.log("📤 Sending data to API:", payload);

//         //  Token (abhi hardcoded, baad me storage se lena)
//         const token =
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6InVzZXIiLCJpYXQiOjE3NTc0MjA4NjcsImV4cCI6MTc1NzQyNDQ2N30.YZlcb1fJay7_F7-l8Q2KbDI5q6Kzik6fFeB8FZoydRQ";

//         //  API Call with token
//         const res = await API.post("/users/asif-user", payload, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, 
//           },
//         });

//         console.log("Final API Response:", res.data);
//       } catch (error) {
//         if (error.response) {
//           console.error("❌ API Error:", error.response.data);
//           Alert.alert("Error", error.response.data.message || "API Error");
//         } else {
//           console.error("❌ Network Error:", error.message);
//           Alert.alert("Error", error.message);
//         }
//       }
//     };

//     sendDataToAPI();

   
//     const timer1 = setTimeout(() => {
//       setShowText(true);
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }).start();
//     }, 2000);

   
//     const timer2 = setTimeout(() => {
//       navigation.navigate("LookingForScreen");
//     }, 3000);

//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//     };
//   }, [fadeAnim, navigation]);

//   return (
//     <View style={styles.container}>
//      {/* background Video */}
//       <Video
//         source={require("../assets/animation3.mp4")}
//         style={styles.backgroundVideo}
//         resizeMode="cover"
//         repeat
//         muted
//       />

      
//       {showText && (
//         <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
//           <Text style={styles.title}>Pleasure to meet you</Text>
//           <Text style={styles.subtitle}>Keep up the good work!</Text>
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   backgroundVideo: {
//     width: 500,
//     height: 1016,
//     alignSelf: "center",
//   },
//   textContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 35,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     marginBottom: 8,
//     letterSpacing: 1,
//     textTransform: "uppercase",
//     textShadowColor: "rgba(0, 0, 0, 0.6)",
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 4,
//   },
//   subtitle: {
//     fontSize: 20,
//     marginTop: 10,
//     textAlign: "center",
//     color: "#eee",
//     lineHeight: 22,
//     letterSpacing: 0.5,
//     fontStyle: "italic",
//     opacity: 0.9,
//   },
// });

// export default PleasureScreen;


import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Video from "react-native-video";

const PleasureScreen = ({ navigation }) => {
  const [showText, setShowText] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Show animated text after 2 seconds
    const timer1 = setTimeout(() => {
      setShowText(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);

    // Navigate to next screen after 3 seconds
    const timer2 = setTimeout(() => {
      navigation.navigate("LookingForScreen");
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        source={require("../assets/animation3.mp4")}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
        muted
      />

      {/* Animated Text */}
      {showText && (
        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Pleasure to meet you</Text>
          <Text style={styles.subtitle}>Keep up the good work!</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundVideo: {
    width: 500,
    height: 1016,
    alignSelf: "center",
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
    color: "#eee",
    lineHeight: 22,
    letterSpacing: 0.5,
    fontStyle: "italic",
    opacity: 0.9,
  },
});

export default PleasureScreen;
