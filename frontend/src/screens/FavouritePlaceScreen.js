import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = [
  { id: "1", name: "Restaurants", icon: "restaurant-outline" },
  { id: "2", name: "Sport", icon: "basketball-outline" },
  { id: "3", name: "Bars and Cafes", icon: "wine-outline" },
  { id: "4", name: "Clubs", icon: "musical-notes-outline" },
  { id: "5", name: "Culture", icon: "film-outline" },
  { id: "6", name: "Outdoor", icon: "leaf-outline" },
];

const FavouritePlacesScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);

  const handleSelect = (item) => {
    if (selected.includes(item.id)) {
      setSelected(selected.filter((i) => i !== item.id));
    } else if (selected.length < 10) {
      setSelected([...selected, item.id]);
    }
  };

  const handleContinue = async () => {
    try {

      await AsyncStorage.setItem("favPlace", JSON.stringify(selected));
      console.log("Favourite places stored locally:", selected);

    
      navigation.navigate("SmokeScreen");
    } catch (error) {
      console.error("Storage Error:", error.message);
      alert("Something went wrong while saving your places.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate("PersonalityScreen")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>What are your favourite Places?</Text>
      <Text style={styles.subTitle}>My selection : {selected.length}/10</Text>

      <View style={styles.selectionWrapper}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.selectionBox}>
            {selected[index] ? (
              <Ionicon
                name={categories.find((c) => c.id === selected[index]).icon}
                size={20}
                color="#000"
              />
            ) : null}
          </View>
        ))}
      </View>

      <View style={styles.searchWrapper}>
        <Ionicon name="search-outline" size={20} color="#8E8E8E" />
        <TextInput
          style={styles.searchInput}
          placeholder="Find a Place"
          placeholderTextColor="#8E8E8E"
        />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleSelect(item)}
          >
            <View style={styles.iconWrapper}>
              <Ionicon name={item.icon} size={20} color="#000" />
            </View>
            <Text style={styles.listText}>{item.name}</Text>
            <Ionicon name="chevron-forward" size={22} color="#000" />
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selected.length === 0 && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={selected.length === 0}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavouritePlacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF4EF",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    color: "#8E8E8E",
    marginBottom: 15,
  },
  selectionWrapper: {
    flexDirection: "row",
    marginBottom: 20,
  },
  selectionBox: {
    width: 60,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2EDEB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#000",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E6E4",
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#E8E6E4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  listText: {
    flex: 1,
    fontSize: 18,
    color: "#000",
  },
  footer: {
    position: "absolute",
    bottom: 30,
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
