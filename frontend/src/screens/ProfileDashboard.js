import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner"

const BASE_URL = "http://192.168.1.34:3000/";
const TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDY1ZmU1M2ZkODNlNjdmZTk5ODI2YSIsImlhdCI6MTc2MTE5ODU2MSwiZXhwIjoxNzYxMjg0OTYxfQ.4_PLFXfEgfkwL_H3aKfUJtrljy3nzbbKxwZo4k4DKVo";
const ProfileDashboard = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/get-user`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        params: { email: "portman@gmail.com" },
      });

      if (res.data.success) {
        setUserData(res.data.data);
      } else {
        Alert.alert("Error", res.data.message || "Failed to fetch user data");
      }
    } catch (err) {
      console.error("❌ API fetch error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData)
    return <LoadingSpinner/>

  // Example: calculate profile completion dynamically
  const fields = [
    "city","fullName","dob","gender","height","sign","education",
    "lookingFor","crush","favPlace","smoke","kids","exercise","images"
  ];
  const filledCount = fields.filter(f => userData[f]).length;
  const completionPercentage = Math.floor((filledCount / fields.length) * 100);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="black" style={styles.backArrow} />
        </TouchableOpacity>

        <Text style={styles.userName}>{userData.fullName || "User"}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditScreen")}
        >
          <Text style={styles.editText}>✎ Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Basic Profile Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Basic profile</Text>
          <Image
            source={
              userData.images?.length
                ? { uri: `${BASE_URL}${userData.images[0].url}` }
                : require("../assets/profile.jpg")
            }
            style={styles.profilePic}
          />
        </View>

        <Text style={styles.percentage}>{completionPercentage}%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${completionPercentage}%` }]} />
        </View>

        <Text style={styles.cardDesc}>
          You’re on the verge of standing out. Your chances of Crushing are
          about to skyrocket!
        </Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate("BoostMyProfile")}>
          <Text style={styles.primaryBtnText}>Increase your attractiveness</Text>
        </TouchableOpacity>
      </View>

      {/* Offer Card */}
      <View style={[styles.card, styles.darkCard]}>
        <Text style={styles.offerText}>50% off</Text>
        <Text style={styles.offerSub}>
          Off your Premium Luvsi subscription
        </Text>
        <View style={styles.expiryBox}>
          <Text style={styles.expiryText}>Expires in 14:59:04</Text>
        </View>
      </View>

     
      <View style={styles.card}>
        <View style={styles.boostRow}>
          <Text style={styles.boostTitle}>My Boosts</Text>
          <Ionicons name="flash" size={22} color="#E0AA3E" style={styles.boostIcon} />
        </View>
        <Text style={styles.cardDesc}>
          Your visibility will skyrocket for 24h
        </Text>

        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate("BoostMyProfile")}>
          <Text style={styles.secondaryBtnText}>Get a Boost</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.boostRow}>
          <Text style={styles.boostTitle}>My SuperCrushes</Text>
          <Ionicons name="star" size={25} color="#eec01aff" style={styles.superIcon} />
        </View>
        <Text style={styles.cardDesc}>
          5x more chances of finding a date
        </Text>

        <TouchableOpacity style={styles.superBtn}>
          <Text style={styles.superBtnText}>3 SuperCrushes left</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsRow} onPress={() => navigation.navigate("PreferenceScreen")}>
          <Ionicons name="options" size={25} color="black" />
          <Text style={styles.settingsText}>Dating preferences</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsRow} onPress={()=> navigation.navigate("SettingsScreen")}>
          <Ionicons name="settings" size={25} style={styles.settingsIcon} />
          <Text style={styles.settingsText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsRow}>
          <Ionicons name="shield-checkmark" size={25} style={styles.settingsIcon} />
          <Text style={styles.settingsText}>Help centre</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF6F0", padding: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backArrow: { fontSize: 22, fontWeight: "bold" },
  userName: { fontSize: 28, fontWeight: "bold", color: "#000" },
  editButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  editText: { fontSize: 14, fontWeight: "600", color: "#000" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  profilePic: { width: 50, height: 50, borderRadius: 25 },

  percentage: { fontSize: 32, fontWeight: "bold", color: "#E0AA3E", marginTop: 10 },
  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    marginVertical: 8,
  },
  progressFill: { height: 6, backgroundColor: "#E0AA3E", borderRadius: 3 },
  cardDesc: { fontSize: 14, color: "#444", marginVertical: 10, lineHeight: 20 },

  primaryBtn: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  darkCard: {
    backgroundColor: "#000",
    borderColor: "#E0AA3E",
    borderWidth: 1,
  },
  offerText: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  offerSub: { fontSize: 14, color: "#eee", marginVertical: 4 },
  expiryBox: {
    backgroundColor: "#E0AA3E",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  expiryText: { fontSize: 12, fontWeight: "600", color: "#000" },

  boostRow: { flexDirection: "row", justifyContent: "space-between" },
  boostTitle: { fontSize: 18, fontWeight: "bold" },
  boostIcon: { fontSize: 22, color: "#E94E77" },

  secondaryBtn: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryBtnText: { fontWeight: "600", color: "#333" },

  superIcon: { fontSize: 25, color: "#3BAFDA" },
  superBtn: {
    backgroundColor: "#AEDBFA",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  superBtnText: { fontWeight: "600", color: "#004080" },

  settingsContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingsIcon: { fontSize: 20, marginRight: 12 },
  settingsText: { fontSize: 16, flex: 1 },
  arrow: { fontSize: 20, color: "#999" },
});

export default ProfileDashboard;
