import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BoostMyProfile = ({ navigation }) => {
  const [selected, setSelected] = useState(null);

  const options = [
    { id: 1, count: 10, label: 'Boosts', price: '₹449.00', perItem: '₹44.90 each', discount: '-35%' },
    { id: 2, count: 3, label: 'Boosts', price: '₹149.00', perItem: '₹49.67 each', discount: '-28%', popular: true },
    { id: 3, count: 1, label: 'Boost', price: '₹69.00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FE6847" />

     
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
      </View>

      
      <View style={styles.boostSection}>
        <View style={styles.boostIconContainer}>
          <Ionicons name="flash-sharp" size={36} color="black" />
        </View>
        <Text style={styles.sectionTitle}>Boost your profile</Text>
        <Text style={styles.sectionSubtitle}>
          Increase your odds of getting tons of likes and Crushes!
        </Text>
      </View>

      
      <View style={styles.optionsContainer}>
        {options.map((opt) => {
          const isSelected = selected === opt.id;

          return (
            <TouchableOpacity
              key={opt.id}
              style={[
                styles.optionCard,
                opt.popular && styles.popularCard,
                isSelected && styles.selectedCard, 
              ]}
              onPress={() => setSelected(opt.id)}
              activeOpacity={0.8}
            >
              {opt.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
              <Text style={[styles.optionCount, (opt.popular || isSelected) && styles.whiteText]}>
                {opt.count}
              </Text>
              <Text style={[styles.optionLabel, (opt.popular || isSelected) && styles.whiteText]}>
                {opt.label}
              </Text>
              <Text style={[styles.optionPrice, (opt.popular || isSelected) && styles.whiteText]}>
                {opt.price}
              </Text>
              {opt.perItem && (
                <Text
                  style={[styles.optionPricePerItem, (opt.popular || isSelected) && styles.whiteText]}
                >
                  {opt.perItem}
                </Text>
              )}
              {opt.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{opt.discount}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

   
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('PaymentScreen', { boostId: selected })}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.premiumButton}
          onPress={() => navigation.navigate('LuvsiPremiumScreen')}
        >
          <Text style={styles.premiumButtonText}>Discover luvsi Premium</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FE6847', paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 30 },
  backButton: { marginRight: 10 },
  boostSection: { alignItems: 'center', marginBottom: 40 },
  boostIconContainer: {
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: { fontSize: 24, fontWeight: '800', color: 'black', marginBottom: 8 },
  sectionSubtitle: { fontSize: 15, color: 'black', textAlign: 'center', width: '80%', lineHeight: 20 },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 50 },
  optionCard: {
    backgroundColor: '#FF886E',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  popularCard: {  transform: [{ scale: 1.05 }], elevation: 6 },
  selectedCard: { backgroundColor: 'black' }, 
  optionCount: { fontSize: 32, fontWeight: '800', color: 'black' },
  optionLabel: { fontSize: 14, color: 'black', marginBottom: 8 },
  optionPrice: { fontSize: 18, fontWeight: 'bold', color: 'black' },
  optionPricePerItem: { fontSize: 13, color: 'black' },
  discountBadge: {
    backgroundColor: 'black',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  discountText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  popularBadge: {
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    position: 'absolute',
    top: -12,
  },
  popularText: { color: 'white' },
  whiteText: { color: 'white' },
  buttonContainer: { alignItems: 'center', marginTop: 'auto', marginBottom: 20 },
  continueButton: {
    backgroundColor: 'black',
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 12,
  },
  buttonText: { color: 'white', fontSize: 17, fontWeight: '700' },
  premiumButton: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  premiumButtonText: { color: 'black', fontSize: 16, fontWeight: '700' },
});

export default BoostMyProfile;
