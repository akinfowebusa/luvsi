import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const DeactivateScreen = ({ navigation }) => {
  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log("Back pressed");
    }
  };

  const handleActivatePause = () => {
    console.log("Pause Mode Activated!");
    
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Image with Pause Icon */}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1603415526960-f8f0a6c61a07",
          }}
          style={styles.image}
        />
        <View style={styles.pauseIcon}>
          <Ionicons name="pause" size={28} color="#000" />
        </View>
      </View>

    
      <Text style={styles.title}>Need a break?</Text>

    
      <Text style={styles.description}>
        By activating Pause mode, you will{" "}
        <Text style={styles.bold}>log out of the app</Text> and be completely{" "}
        <Text style={styles.bold}>invisible to other happners</Text> until the
        next time you log in.
      </Text>

      <Text style={styles.description}>
        All your profile information and conversations will be saved.
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleActivatePause}>
        <Ionicons name="pause" size={18} color="#fff" />
        <Text style={styles.buttonText}>Activate Pause mode</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F4",
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 10,
  },
  imageWrapper: {
    alignItems: "center",
    marginVertical: 20,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 20,
  },
  pauseIcon: {
    position: "absolute",
    top: "40%",
    left: "45%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    color: "#333",
    marginVertical: 8,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "600",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 30,
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default DeactivateScreen;
