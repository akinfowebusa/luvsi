// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import axios from "axios";

// const BASE_URL = "http://192.168.1.14:3000/";
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDY1ZmU1M2ZkODNlNjdmZTk5ODI2YSIsImlhdCI6MTc1OTEyNjk3MCwiZXhwIjoxNzU5MjEzMzcwfQ.5Jnw4Rfv2P0jkobpY9Q7b036SxXp39dlyuIuB4ZiS3M";

// const UserProfileScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState(null);

//   const fetchUserData = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}api/get-user`, {
//         headers: { Authorization: `Bearer ${TOKEN}` },
//         params: { email: "portman@gmail.com" },
//       });

//       if (res.data.success) {
//         setUserData(res.data.data);
//         console.log("📥 Fetched User Data:", res.data.data);
//       } else {
//         Alert.alert("Error", res.data.message || "Failed to fetch user data");
//       }
//     } catch (err) {
//       console.error(" API fetch error:", err.response?.data || err.message);
//       Alert.alert("Error", "Failed to fetch user data");
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   if (!userData)
//     return <Text style={{ marginTop: 50, textAlign: "center" }}>Loading...</Text>;

  
//   const basicInfo = [
//     { label: `🏠 ${userData.city || "-"}`, highlight: false },
//     { label: `📏 ${userData.height || "-"} cm`, highlight: false },
//     { label: `🎓 ${userData.education || "-"}`, highlight: true },
//     { label: `🍼 ${userData.kids || "-"}`, highlight: true },
//     { label: `👟 ${userData.exercise || "-"}`, highlight: false },
//     { label: `♓ ${userData.sign || "-"}`, highlight: false },
//   ];

//   const moreInfo = [
//     { label: `💖 Looking for: ${userData.lookingFor || "-"}`, highlight: false },
//     { label: `💌 Crush: ${userData.crush || "-"}`, highlight: false },
//     {
//       label: `📍 Fav Places: ${
//         userData.favPlace?.length ? userData.favPlace.join(", ") : "-"
//       }`,
//       highlight: false,
//     },
//     { label: `🚬 Smoke: ${userData.smoke || "-"}`, highlight: false },
//     { label: `Gender: ${userData.gender || "-"}`, highlight: false },
//     { label: `DOB: ${userData.dob || "-"}`, highlight: false },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
     
//       <View style={styles.header}>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="notifications" size={30} color="white" onPress={()=> navigation.navigate("NotificationScreen")} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("ProfileDashboard")}
//           >
//             <Image
//               source={
//                 userData.images?.length
//                   ? { uri: `${BASE_URL}${userData.images[0].url}` }
//                   : require("../assets/profile.jpg")
//               }
//               style={styles.avatar}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <Text style={styles.userName}>{userData.fullName}</Text>

//       <ScrollView showsVerticalScrollIndicator={false}>
        
//         <View style={styles.aboutBox}>
//           <Text style={styles.aboutTitle}>About me</Text>
//           <View style={styles.tagsContainer}>
//             {basicInfo.map((item, idx) => (
//               <Text
//                 key={idx}
//                 style={[styles.tag, item.highlight && styles.highlight]}
//               >
//                 {item.label}
//               </Text>
//             ))}
//           </View>
//         </View>

       
//         {userData.images?.map((img, idx) => (
//           <Image
//             key={idx}
//             source={{ uri: `${BASE_URL}${img.url}` }}
//             style={styles.userPhoto}
//           />
//         ))}

        
//         <View style={styles.aboutBox}>
//           <Text style={styles.aboutTitle}>More Info</Text>
//           <View style={styles.tagsContainer}>
//             {moreInfo.map((item, idx) => (
//               <Text
//                 key={idx}
//                 style={[styles.tag, item.highlight && styles.highlight]}
//               >
//                 {item.label}
//               </Text>
//             ))}
//           </View>
//         </View>

//         <View style={{ height: 80 }} />
//       </ScrollView>

      
//       <View style={styles.actionButtons}>
//         <TouchableOpacity style={styles.action} onPress={()=>{navigation.navigate("BoostMyProfile")}}>
//           <Ionicons name="flash" size={26} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.action}>
//           <Ionicons name="close" size={26} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.action}>
//           <Ionicons name="heart" size={26} color="#fff" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.action}>
//           <Ionicons name="star" size={26} color="#fff" onPress={()=>{navigation.navigate("LuvsiPremiumScreen")}}/>
//         </TouchableOpacity>
//       </View>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity onPress={() => navigation.navigate("UserProfileScreen")}>
//           <Ionicons name="home-outline" size={22} color="#964B00" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate("HubScreen")}>
//           <Ionicons name="grid-outline" size={22} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
//           <Ionicons name="map-outline" size={22} color="#4cef0cff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate("LikesScreen")}>
//           <Ionicons name="heart-outline" size={22} color="#de0d0dff" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
//           <Ionicons name="chatbubble-outline" size={22} color="#3139cfff" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default UserProfileScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FAF4EF" },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//   },
//   headerRight: { flexDirection: "row", alignItems: "center",justifyContent:"flex-end", width:"100%" },
//   iconButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 100,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FFA500",
//     marginRight: 10,
//   },
//   avatar: { width: 40, height: 40, borderRadius: 20 },
//   userName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginLeft: 15,
//     marginBottom: 10,
//   },
//   aboutBox: {
//     backgroundColor: "#fff",
//     margin: 25,
//     borderRadius: 15,
//     padding: 15,
//   },
//   aboutTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   tagsContainer: { flexDirection: "row", flexWrap: "wrap" },
//   tag: {
//     backgroundColor: "#F2F2F2",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 10,
//     margin: 4,
//     fontSize: 14,
//   },
//   highlight: { backgroundColor: "#D9B3F0" },
//   userPhoto: {
//     width: "100%",
//     height: 400,
//     margin: 10,
//     marginBottom: 15,
//     borderRadius: 15,
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//     backgroundColor: "#fff",
//   },
//   actionButtons: {
//     position: "absolute",
//     bottom: 70,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingHorizontal: 20,
//   },
//   action: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     fontSize: 26,
//     color: "#fff",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const BASE_URL = "http://192.168.1.34:3000/";
const TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDY1ZmU1M2ZkODNlNjdmZTk5ODI2YSIsImlhdCI6MTc2MTE5ODU2MSwiZXhwIjoxNzYxMjg0OTYxfQ.4_PLFXfEgfkwL_H3aKfUJtrljy3nzbbKxwZo4k4DKVo"
const UserProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [showHeart, setShowHeart] = useState(false);
  const [showX, setShowX] = useState(false);
  const heartAnim = useState(new Animated.Value(0))[0];
  const xAnim = useState(new Animated.Value(0))[0];

  const triggerAnimation = (type) => {
    const anim = type === "heart" ? heartAnim : xAnim;
    type === "heart" ? setShowHeart(true) : setShowX(true);

    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        type === "heart" ? setShowHeart(false) : setShowX(false);
       
      });
    }, 4000);
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/get-user`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        params: { email: "portman@gmail.com" },
      });

      if (res.data.success) {
        setUserData(res.data.user || res.data.data);
      } else {
        Alert.alert("Error", res.data.message || "Failed to fetch user data");
      }
    } catch (err) {
      console.error(" API fetch error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData)
    return <LoadingSpinner/>

  const basicInfo = [
    { label: `🏠 ${userData.city || "-"}`, highlight: false },
    { label: `📏 ${userData.height || "-"} cm`, highlight: false },
    { label: `🎓 ${userData.education || "-"}`, highlight: true },
    { label: `🍼 ${userData.kids || "-"}`, highlight: true },
    { label: `👟 ${userData.exercise || "-"}`, highlight: false },
    { label: `♓ ${userData.sign || "-"}`, highlight: false },
  ];

  const moreInfo = [
    { label: `💖 Looking for: ${userData.lookingFor || "-"}`, highlight: false },
    { label: `💌 Crush: ${userData.crush || "-"}`, highlight: false },
    {
      label: `📍 Fav Places: ${userData.favPlace?.length ? userData.favPlace.join(", ") : "-"}`,
      highlight: false,
    },
    { label: `🚬 Smoke: ${userData.smoke || "-"}`, highlight: false },
    { label: `Gender: ${userData.gender || "-"}`, highlight: false },
    { label: `DOB: ${userData.dob || "-"}`, highlight: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications" size={30} color="white" onPress={() => navigation.navigate("NotificationScreen")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileDashboard")}>
            <Image
              source={
                userData.images?.length
                  ? { uri: `${BASE_URL}${userData.images[0].url}` }
                  : require("../assets/profile.jpg")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.userName}>{userData.fullName}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
     
        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>About me</Text>
          <View style={styles.tagsContainer}>
            {basicInfo.map((item, idx) => (
              <Text key={idx} style={[styles.tag, item.highlight && styles.highlight]}>
                {item.label}
              </Text>
            ))}
          </View>
        </View>

    
        {userData.images?.map((img, idx) => (
          <View key={idx} style={styles.imageCard}>
            <Image
              source={{ uri: `${BASE_URL}${img.url}` }}
              style={styles.userPhoto}
              resizeMode="cover"
            />
          </View>
        ))}

        {/* More Info Box */}
        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>More Info</Text>
          <View style={styles.tagsContainer}>
            {moreInfo.map((item, idx) => (
              <Text key={idx} style={[styles.tag, item.highlight && styles.highlight]}>
                {item.label}
              </Text>
            ))}
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.action} onPress={() => navigation.navigate("BoostMyProfile")}>
          <Ionicons name="flash" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={() => triggerAnimation("x")}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={() => triggerAnimation("heart")}>
          <Ionicons name="heart" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={() => navigation.navigate("LuvsiPremiumScreen")}>
          <Ionicons name="star" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Animated Popups */}
      {showHeart && (
        <Animated.View style={[styles.popup, { opacity: heartAnim, transform: [{ scale: heartAnim }] }]}>
          <Text style={styles.popupText}>❤️ </Text>
        </Animated.View>
      )}
      {showX && (
        <Animated.View style={[styles.popup, { opacity: xAnim, transform: [{ scale: xAnim }] }]}>
          <Text style={styles.popupText}>❌ </Text>
        </Animated.View>
      )}

     
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

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF4EF" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 },
  headerRight: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: "100%" },
  iconButton: { width: 40, height: 40, borderRadius: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#FFA500", marginRight: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  userName: { fontSize: 24, fontWeight: "bold", marginLeft: 15, marginBottom: 10 },
  aboutBox: { backgroundColor: "#fff", margin: 25, borderRadius: 15, padding: 15 },
  aboutTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap" },
  tag: { backgroundColor: "#F2F2F2", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, margin: 4, fontSize: 14 },
  highlight: { backgroundColor: "#D9B3F0" },
  imageCard: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  userPhoto: { width: "100%", height: 400 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 12, borderTopWidth: 1, borderTopColor: "#E0E0E0", backgroundColor: "#fff" },
  actionButtons: { position: "absolute", bottom: 70, left: 0, right: 0, flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 20 },
  action: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#964B00", justifyContent: "center", alignItems: "center" },
  icon: { fontSize: 26, color: "#fff" },
  popup: { position: "absolute", top: "40%", alignSelf: "center", backgroundColor: "rgba(0,0,0,0)", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, zIndex: 999 },
  popupText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});
