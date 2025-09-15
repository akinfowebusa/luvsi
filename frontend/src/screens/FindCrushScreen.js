import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { setItem } from "../utils/storage";   // ✅ AsyncStorage helper

const FindCrushScreen = () => {
  const navigation = useNavigation();
  const [city, setCity] = React.useState("");

  const handleContinue = async () => {
    if (city.trim()) {
      try {
        // ✅ Save to AsyncStorage
        await setItem("city", city);
        console.log("✅ City stored locally:", city);

        // ✅ Navigate to next screen
        navigation.navigate("FavouritePlacesScreen", { userCity: city });
      } catch (error) {
        console.error("❌ Storage Error:", error.message);
        Alert.alert("Error", "Something went wrong while saving your city.");
      }
    } else {
      alert("Please enter your city");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("FavouritePlacesScreen")}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title & Subtitle */}
      <Text style={styles.title}>Find a Crush in your city</Text>
      <Text style={styles.subtitle}>
        Add your current city to receive geo-localised recommendations
      </Text>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Where do you live?"
        placeholderTextColor="#aaa"
        value={city}
        onChangeText={setCity}
      />

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !city.trim() && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!city.trim()}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FindCrushScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF4EF",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  skip: {
    fontSize: 16,
    color: "#8E8E8E",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E8E",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
  continueButton: {
    backgroundColor: "#F06292",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: "#E8A8C1",
  },
  continueText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
