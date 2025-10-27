import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const LuvsiPremiumScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(2); 

  const plans = [
    {
      id: 1,
      duration: "6 months",
      price: "₹1,299.00",
      perMonth: "₹216.50/m.",
      discount: "-69%",
    },
    {
      id: 2,
      duration: "3 months",
      price: "₹899.00",
      perMonth: "₹299.67/m.",
      discount: "-57%",
      popular: true,
    },
    {
      id: 3,
      duration: "1 month",
      price: "₹699.00",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F8D162" barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
       
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="black" />
          </TouchableOpacity>
        </View>

        
        <Text style={styles.title}>Premium</Text>
        <Text style={styles.subtitle}>Find out who likes you</Text>
        <Text style={styles.desc}>
          No more secrets! Browse through the list of your admirers.
        </Text>

       
        <View style={styles.plansRow}>
          {plans.map((plan) => {
            const isSelected = selected === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  plan.popular && styles.popularCard,
                  isSelected && styles.selectedCard,
                ]}
                onPress={() => setSelected(plan.id)}
                activeOpacity={0.8}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>Popular</Text>
                  </View>
                )}
                <Text
                  style={[
                    styles.planDuration,
                    (isSelected || plan.popular) && styles.whiteText,
                  ]}
                >
                  {plan.duration.split(" ")[0]}
                </Text>
                <Text
                  style={[
                    styles.planLabel,
                    (isSelected || plan.popular) && styles.whiteText,
                  ]}
                >
                  {plan.duration.split(" ")[1]}
                </Text>
                <Text
                  style={[
                    styles.planPrice,
                    (isSelected || plan.popular) && styles.whiteText,
                  ]}
                >
                  {plan.price}
                </Text>
                {plan.perMonth && (
                  <Text
                    style={[
                      styles.planPerMonth,
                      (isSelected || plan.popular) && styles.whiteText,
                    ]}
                  >
                    {plan.perMonth}
                  </Text>
                )}
                {plan.discount && (
                  <View
                    style={[
                      styles.discountBadge,
                      (isSelected || plan.popular) && styles.discountDark,
                    ]}
                  >
                    <Text style={styles.discountText}>{plan.discount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.infoText}>
          When you click on 'Choose this offer', your payment will be charged to
          your Google Play account, and you’ll subscribe to the selected offer
          for the specified period. At the end of this period, your subscription
          will automatically renew at the standard price and for the same
          duration, unless renewal is disabled in your account.
        </Text>

        
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() =>
            navigation.navigate("PaymentScreen", { planId: selected })
          }
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8D162" },
  header: { padding: 16 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginTop: 10 },
  subtitle: { fontSize: 18, fontWeight: "600", textAlign: "center", marginTop: 10 },
  desc: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginHorizontal: 40,
    marginTop: 5,
  },
  plansRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 30,
  },
  planCard: {
    flex: 1,
    backgroundColor: "#FEE9B2",
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: "center",
    marginHorizontal: 6,
  },
  popularCard: { transform: [{ scale: 1.05 }], elevation: 4 },
  selectedCard: { backgroundColor: "black" },
  planDuration: { fontSize: 28, fontWeight: "bold", color: "black" },
  planLabel: { fontSize: 14, color: "black", marginBottom: 8 },
  planPrice: { fontSize: 18, fontWeight: "bold", color: "black" },
  planPerMonth: { fontSize: 13, color: "black" },
  discountBadge: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  discountDark: { backgroundColor: "white" },
  discountText: { fontSize: 12, fontWeight: "bold", color: "black" },
  popularBadge: {
    backgroundColor: "#999",
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    position: "absolute",
    top: -12,
  },
  popularBadgeText: { color: "white", fontSize: 12, fontWeight: "600" },
  whiteText: { color: "white" },
  infoText: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
  continueButton: {
    backgroundColor: "black",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginHorizontal: 40,
    marginVertical: 20,
  },
  continueText: { color: "white", fontSize: 16, fontWeight: "700" },
});

export default LuvsiPremiumScreen;
