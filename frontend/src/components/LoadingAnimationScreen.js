import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
// import Video from "react-native-video";

export default function LoadingAnimationScreen({ navigation }) {
  useEffect(() => {
    // Navigate after 3 seconds (animation duration)
    const timer = setTimeout(() => {
      navigation.replace("UserProfileScreen"); // 👉 Next screen
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/Comp 1.json")} // 👈 Your JSON file
        autoPlay
        loop={false}
      />
        {/* <View style={styles.container}> */}
      {/* Background Video */}
      {/* <Video
        source={require("../assets/popper.mp4")}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
        muted
      /> */}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black", // black background
    justifyContent: "center",
    alignItems: "center",
  },
});
