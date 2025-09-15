// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const UserProfileScreen = ({ navigation, route }) => {
//   // Dummy data (API ya AsyncStorage se laa sakte ho)
//   const photos = [
//     require("../assets/1.jpg"),
//     require("../assets/2.jpg"),
//     require("../assets/3.jpg"),
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Fixed Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.backArrow}>←</Text>
//         </TouchableOpacity>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Text style={styles.bell}>🔔</Text>
//           </TouchableOpacity>
//           <Image
//             source={require("../assets/profile.jpg")}
//             style={styles.avatar}
//           />
//         </View>
//       </View>

//       {/* Scrollable Content */}

//       <Text style={{fontSize:24, fontWeight:'bold', marginLeft:15, marginBottom:10}}>Morris Garage</Text>  
//       <ScrollView showsVerticalScrollIndicator={false}>

        
//         {/* About Me Section */}
//         <View style={styles.aboutBox}>
//           <Text style={styles.aboutTitle}>About me</Text>
//           <View style={styles.tagsContainer}>
//             <Text style={styles.tag}>🏠 Noida, India</Text>
//             <Text style={styles.tag}>📍 100 m away</Text>
//             <Text style={styles.tag}>🚬 Not a fan, but whatever</Text>
//             <Text style={[styles.tag, styles.highlight]}>🍼 I don’t want kids</Text>
//             <Text style={styles.tag}>👟 Never</Text>
//             <Text style={styles.tag}>♓ Pisces</Text>
//             <Text style={[styles.tag, styles.highlight]}>🎓 Bachelor's Degree</Text>
//             <Text style={styles.tag}>📏 166 cm (5’5”)</Text>
//           </View>
//         </View>

//         {/* User Photos (scrollable) */}
//         {photos.map((photo, index) => (
//           <Image key={index} source={photo} style={styles.userPhoto} />
//         ))}

//         <View style={{ height: 80 }} /> {/* Space for icons */}
//       </ScrollView>

//       {/* Fixed Action Buttons */}
//       <View style={styles.actionButtons}>
//         <TouchableOpacity style={styles.action}>
//           <Text style={styles.icon}>⚡</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.action}>
//           <Text style={styles.icon}>❌</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.action}>
//           <Text style={styles.icon}>❤️</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.action}>
//           <Text style={styles.icon}>⭐</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Fixed Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <Text style={styles.navItem}>🏠 Home</Text>
//         <Text style={styles.navItem}>▦ Hub</Text>
//         <Text style={styles.navItem}>🚶 Map</Text>
//         <Text style={styles.navItem}>❤️ Likes</Text>
//         <Text style={styles.navItem}>💬 Chat</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FAF4EF",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//   },
//   backArrow: {
//     fontSize: 22,
//     color: "#000",
//   },
//   headerRight: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   iconButton: {
//     marginRight: 10,
//   },
//   bell: {
//     fontSize: 20,
//   },
//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//   },
//   aboutBox: {
//     backgroundColor: "#fff",
//     margin: 15,
//     borderRadius: 15,
//     padding: 15,
//   },
//   aboutTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   tagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   tag: {
//     backgroundColor: "#F2F2F2",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 10,
//     margin: 4,
//     fontSize: 14,
//   },
//   highlight: {
//     backgroundColor: "#D9B3F0",
//   },
//   userPhoto: {
//     width: "100%",
//     height: 400,
//     marginBottom: 15,
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
//     backgroundColor: "#000",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     fontSize: 26,
//     color: "#fff",
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//     backgroundColor: "#fff",
//   },
//   navItem: {
//     fontSize: 14,
//   },
// });

// export default UserProfileScreen;
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profilesData = [
  {
    id: 1,
    name: "Morris Garage",
    about: [
      { label: "🏠 Noida, India", highlight: false },
      { label: "📍 100 m away", highlight: false },
      { label: "🚬 Not a fan, but whatever", highlight: false },
      { label: "🍼 I don’t want kids", highlight: true },
      { label: "👟 Never", highlight: false },
      { label: "♓ Pisces", highlight: false },
      { label: "🎓 Bachelor's Degree", highlight: true },
      { label: "📏 166 cm (5’5”)", highlight: false },
    ],
    photos: [
      require("../assets/1.jpg"),
      require("../assets/2.jpg"),
      require("../assets/3.jpg"),
    ],
  },
  {
    id: 2,
    name: "Aisha",
    about: [
      { label: "🏠 Delhi, India", highlight: false },
      { label: "📍 2 km away", highlight: false },
      { label: "🎶 Loves music", highlight: true },
      { label: "👟 Sometimes", highlight: false },
      { label: "♌ Leo", highlight: false },
    ],
    photos: [
      require("../assets/2.jpg"),
      require("../assets/3.jpg"),
      require("../assets/1.jpg"),
    ],
  },
];

const UserProfileScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const user = profilesData[index];

  const handleAction = (type) => {
    console.log(`${type} → ${user.name}`);

    // ✅ Next profile → repeat loop
    if (index < profilesData.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0); // 👈 reset to first profile
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.bell}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileDashboard")}>
            <Image
              source={require("../assets/profile.jpg")}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <Text style={styles.userName}>{user.name}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* About Me Section */}
        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>About me</Text>
          <View style={styles.tagsContainer}>
            {user.about.map((item, idx) => (
              <Text
                key={idx}
                style={[styles.tag, item.highlight && styles.highlight]}
              >
                {item.label}
              </Text>
            ))}
          </View>
        </View>

        {/* User Photos */}
        {user.photos.map((photo, idx) => (
          <Image key={idx} source={photo} style={styles.userPhoto} />
        ))}

        <View style={{ height: 80 }} /> {/* Space for buttons */}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => handleAction("superlike")}
        >
          <Text style={styles.icon}>⚡</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          onPress={() => handleAction("dislike")}
        >
          <Text style={styles.icon}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          onPress={() => handleAction("like")}
        >
          <Text style={styles.icon}>❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          onPress={() => handleAction("favourite")}
        >
          <Text style={styles.icon}>⭐</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>🏠 Home</Text>
        <Text style={styles.navItem}>▦ Hub</Text>
        <Text style={styles.navItem}>🚶 Map</Text>
        <Text style={styles.navItem}>❤️ Likes</Text>
        <Text style={styles.navItem}>💬 Chat</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF4EF" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  backArrow: { fontSize: 22, color: "#000" },
  headerRight: { flexDirection: "row", alignItems: "center" },
  iconButton: { marginRight: 10 },
  bell: { fontSize: 20 },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  aboutBox: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 15,
    padding: 15,
  },
  aboutTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap" },
  tag: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    margin: 4,
    fontSize: 14,
  },
  highlight: { backgroundColor: "#D9B3F0" },
  userPhoto: {
    width: "100%",
    height: 400,
    marginBottom: 15,
    borderRadius: 15,
  },
  actionButtons: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  action: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { fontSize: 26, color: "#fff" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  navItem: { fontSize: 14 },
});

export default UserProfileScreen;
