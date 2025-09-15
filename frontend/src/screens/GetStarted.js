// GetStarted.js
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";

// Getting the screen dimensions
const { width, height } = Dimensions.get("window");

export default function LuvsiLoginPage({ navigation }) {
  const hearts = Array.from({ length: 10 }).map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    hearts.forEach((anim, index) => {
      const animate = () => {
        anim.setValue(0);
        Animated.timing(anim, {
          toValue: 1,
          duration: 6000 + index * 500,
          useNativeDriver: true,
        }).start(() => animate());
      };
      animate();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={{ uri: "https://www.google.com/imgres?q=couple%20wallpaper&imgurl=https%3A%2F%2Fwallpapercat.com%2Fw%2Ffull%2Fd%2F3%2Fa%2F927690-2160x3840-samsung-4k-love-couple-background-photo.jpg&imgrefurl=https%3A%2F%2Fwallpapercat.com%2Flove-couple-wallpapers&docid=5VRCRjyqndAHaM&tbnid=LadbtZG7e8idYM&vet=12ahUKEwjD74mugLePAxUHRmwGHad7KY4QM3oECCwQAA..i&w=2160&h=3840&hcb=2&ved=2ahUKEwjD74mugLePAxUHRmwGHad7KY4QM3oECCwQAA" }} // Replace with your couple image
        style={styles.background}
        blurRadius={2}
      >
        {/* Floating Hearts */}
        {hearts.map((anim, i) => {
          const translateY = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [height, -100],
          });
          const translateX = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [Math.random() * width, Math.random() * width],
          });
          const opacity = anim.interpolate({
            inputRange: [0, 0.1, 1],
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.heartContainer,
                {
                  transform: [{ translateY }, { translateX }],
                  opacity,
                },
              ]}
            >
              <Text style={styles.heart}>❤️</Text>
            </Animated.View>
          );
        })}

        {/* App Logo */}
        <View style={styles.logoBox}>
          <Text style={styles.logo}>❤️</Text>
          <Text style={styles.logoText}>Luvsi</Text>
        </View>

        {/* Get Started Button */}
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("AuthScreen")} // Navigates to NextPage on press
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffb6c1",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartContainer: {
    position: "absolute",
  },
  heart: {
    fontSize: 30, // Slightly increased font size for the hearts
  },
  logoBox: {
    alignItems: "center",
    marginTop: 150,
  },
  logo: {
    fontSize: 60,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "#ff69b4",
    padding: 15,
    borderRadius: 30,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
