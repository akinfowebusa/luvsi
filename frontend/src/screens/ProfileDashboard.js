import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ProfileDashboard = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.userName}>Morris Garrage</Text>
        <TouchableOpacity style={styles.editButton}  onPress={() => navigation.goBack()}>
          <Text style={styles.editText}>✎ Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Completion Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Basic profile</Text>
          <Image
            source={{ uri: "https://i.ibb.co/0rJZzZx/heart.png" }}
            style={styles.profilePic}
          />
        </View>

        <Text style={styles.percentage}>56%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "56%" }]} />
        </View>

        <Text style={styles.cardDesc}>
          You’re on the verge of standing out. Your chances of Crushing are
          about to skyrocket!
        </Text>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>Increase your attractiveness</Text>
        </TouchableOpacity>
      </View>

      {/* Offer Card */}
      <View style={[styles.card, styles.darkCard]}>
        <Text style={styles.offerText}>50% off</Text>
        <Text style={styles.offerSub}>
          Off your Premium happn subscription
        </Text>
        <View style={styles.expiryBox}>
          <Text style={styles.expiryText}>Expires in 14:59:04</Text>
        </View>
      </View>

      {/* Boosts Card */}
      <View style={styles.card}>
        <View style={styles.boostRow}>
          <Text style={styles.boostTitle}>My Boosts</Text>
          <Text style={styles.boostIcon}>⚡</Text>
        </View>
        <Text style={styles.cardDesc}>
          Your visibility will skyrocket for 24h
        </Text>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Get a Boost</Text>
        </TouchableOpacity>
      </View>

      {/* SuperCrushes Card */}
      <View style={styles.card}>
        <View style={styles.boostRow}>
          <Text style={styles.boostTitle}>My SuperCrushes</Text>
          <Text style={styles.superIcon}>⭐</Text>
        </View>
        <Text style={styles.cardDesc}>
          5x more chances of finding a date
        </Text>

        <TouchableOpacity style={styles.superBtn}>
          <Text style={styles.superBtnText}>3 SuperCrushes left</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsRow}>
          <Text style={styles.settingsIcon}>⚙️</Text>
          <Text style={styles.settingsText}>Dating preferences</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsRow}>
          <Text style={styles.settingsIcon}>🛠️</Text>
          <Text style={styles.settingsText}>Settings</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsRow}>
          <Text style={styles.settingsIcon}>❓</Text>
          <Text style={styles.settingsText}>Help centre</Text>
          <Text style={styles.arrow}>›</Text>
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

  // ⭐ SuperCrush Styles
  superIcon: { fontSize: 22, color: "#3BAFDA" },
  superBtn: {
    backgroundColor: "#AEDBFA",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  superBtnText: { fontWeight: "600", color: "#004080" },

  // ⚙️ Settings Section
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
