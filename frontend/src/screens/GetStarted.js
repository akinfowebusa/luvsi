
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
// import Ionicon from "react-native-vector-icons/Ionicons";


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

      <ImageBackground
        source={require('../assets/getstarted-image.jpg')}
        style={styles.background}
        resizeMode="cover"
      >

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


        <View style={styles.logoBox}>
          <Text style={styles.logo} >❤️</Text>
          {/* <Ionicon name="heart" size={50} color="red" style={styles.logo} /> */}
          <Text style={styles.logoText}>Luvsi</Text>
        </View>


        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: '#ff69b4', borderWidth: 1, borderColor: '#ccc' }
          ]}
          onPress={() => navigation.navigate('AuthScreen')}
        >

          <Text style={[styles. buttonText, { color: '#fff' }]}>
            Get Started
          </Text>
        </TouchableOpacity>
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
    fontSize: 30,
  },
  logoBox: {
    alignItems: "center",
    marginTop: 150,
  },
  logo: {
    fontSize: 40,
    
  },
  logoText: {
    fontFamily:"GreatVibes-Regular",
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "#ff69b4",
    padding: 15,
    borderRadius: 30,
    marginTop: 400,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",

  },
});
