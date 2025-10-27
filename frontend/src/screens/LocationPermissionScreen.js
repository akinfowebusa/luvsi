import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Platform, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

const LocationPermissionScreen = () => {
  const navigation = useNavigation();

  const handleEnableLocation = async () => {
    try {
      
      let result;
      if (Platform.OS === "ios") {
        result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else {
        result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      }

      if (result === RESULTS.GRANTED) {
        
        navigation.navigate("FavouritePlacesScreen");
        console.log(" Location Permission Granted");
      } else if (result === RESULTS.DENIED) {
        Alert.alert("Permission Denied", "Please enable location to continue.");
        console.log(" Location Permission Denied");
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          "Permission Blocked",
          "Go to settings and enable location permission manually.",
          [
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      }
    } catch (error) {
      console.error(" Location Permission Error:", error);
    }
  };

  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      
      <View style={styles.imageWrapper}>
        <Image
          source={require("../assets/locationBanner.jpg")}
          style={styles.banner}
          resizeMode="cover"
        />
      </View>

    
      <Text style={styles.title}>See who you crossed paths with</Text>
      <Text style={styles.subtitle}>
        Select <Text style={{ fontWeight: "bold" }}>“While using the app”</Text>{" "}
        to see your future Crushes. Don’t worry, others will never see your
        real-time location.
      </Text>

    
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleEnableLocation}
        >
        
          <Text style={styles.continueText}>Enable location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.privacyWrapper}>
          <Ionicon name="shield-checkmark" size={18} color="#000" />
          <Text style={styles.privacyText}> Our privacy commitments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationPermissionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF4EF", paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  backArrow: { fontSize: 22, color: "#000" },
  imageWrapper: { alignItems: "center", marginTop: 20, marginBottom: 20 },
  banner: { width: "100%", height: 160, borderRadius: 16 },
  title: { fontSize: 26, fontWeight: "bold", color: "#000", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#8E8E8E", marginBottom: 30 },
  footer: { position: "absolute", bottom: 40, left: 20, right: 20, alignItems: "center" },
  continueButton: { backgroundColor: "#F06292", paddingVertical: 15, borderRadius: 10, alignItems: "center", width: "100%", marginBottom: 15 },
  continueText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  privacyWrapper: { flexDirection: "row", alignItems: "center" },
  privacyText: { fontSize: 15, color: "#000", fontWeight: "500" },
});


// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
//   Platform,
//   Linking,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/Ionicons";
// import {
//   request,
//   PERMISSIONS,
//   RESULTS,
// } from "react-native-permissions";
// import Geolocation from "react-native-geolocation-service";

// const LocationPermissionScreen = () => {
//   const navigation = useNavigation();

//   const handleEnableLocation = async () => {
//     try {
//       let permission;

//       if (Platform.OS === "ios") {
//         permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
//       } else {
//         permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
//       }

//       const result = await request(permission);

//       if (result === RESULTS.GRANTED) {
//         console.log("✅ Location Permission Granted");

//         // Step 2: Fetch user location
//         Geolocation.getCurrentPosition(
//           (position) => {
//             console.log("📍 User Location:", position);
//             // Navigate forward with location
//             navigation.navigate("FavouritePlacesScreen", {
//               userLocation: position.coords,
//             });
//           },
//           (error) => {
//             console.log("❌ Location Error:", error);
//             Alert.alert("Error", "Unable to fetch location");
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//       } else if (result === RESULTS.DENIED) {
//         Alert.alert("Permission Denied", "Please enable location to continue.");
//         console.log("❌ Location Permission Denied");
//       } else if (result === RESULTS.BLOCKED) {
//         Alert.alert(
//           "Permission Blocked",
//           "Go to settings and enable location permission manually.",
//           [
//             {
//               text: "Open Settings",
//               onPress: () => Linking.openSettings(),
//             },
//           ]
//         );
//       }
//     } catch (error) {
//       console.error("❌ Location Permission Error:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.backArrow}>{"<"}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Image */}
//       <View style={styles.imageWrapper}>
//         <Image
//           source={require("../assets/locationBanner.jpg")}
//           style={styles.banner}
//           resizeMode="cover"
//         />
//       </View>

//       {/* Title & Subtitle */}
//       <Text style={styles.title}>See who you crossed paths with</Text>
//       <Text style={styles.subtitle}>
//         Select <Text style={{ fontWeight: "bold" }}>“While using the app”</Text>{" "}
//         to see your future Crushes. Don’t worry, others will never see your
//         real-time location.
//       </Text>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={styles.continueButton}
//           onPress={handleEnableLocation}
//         >
//           <Text style={styles.continueText}>Enable location</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.privacyWrapper}>
//           <Icon name="shield-checkmark" size={18} color="#000" />
//           <Text style={styles.privacyText}> Our privacy commitments</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default LocationPermissionScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FAF4EF", paddingHorizontal: 20 },
//   header: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
//   backArrow: { fontSize: 22, color: "#000" },
//   imageWrapper: { alignItems: "center", marginTop: 20, marginBottom: 20 },
//   banner: { width: "100%", height: 160, borderRadius: 16 },
//   title: { fontSize: 26, fontWeight: "bold", color: "#000", marginBottom: 12 },
//   subtitle: { fontSize: 16, color: "#8E8E8E", marginBottom: 30 },
//   footer: {
//     position: "absolute",
//     bottom: 40,
//     left: 20,
//     right: 20,
//     alignItems: "center",
//   },
//   continueButton: {
//     backgroundColor: "#F06292",
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "100%",
//     marginBottom: 15,
//   },
//   continueText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
//   privacyWrapper: { flexDirection: "row", alignItems: "center" },
//   privacyText: { fontSize: 15, color: "#000", fontWeight: "500" },
// });
