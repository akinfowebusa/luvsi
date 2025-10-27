import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TermsOfServiceScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.heading}>Our Terms of Service</Text>
        <Text style={styles.text}>
          Welcome to dummy AI! We appreciate your use of our services. By using our website
          and services, you agree to comply with and be bound by the following terms and
          conditions of use. Please read these terms carefully before using our services.
          We may send you emails at any time.
        </Text>
        <Text style={styles.text}>
          Collection and Use of Information: We collect your name, email, and profile photo
          to improve our services, enhance security for our customers, and establish secure
          communication. We do not share your information with any third parties, but we do
          have partnerships with Stripe and OpenAI and Sendinblue. We value the security and
          privacy of our users.
        </Text>
      </ScrollView>

      <LinearGradient colors={['#f78ca0', '#f9748f']} style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
          <Text style={styles.buttonText}>I agree to these terms</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text style={styles.footer}>
        when you sign up, you accept our terms of service and privacy policy.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  content: { marginBottom: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, color: '#333', marginBottom: 15, lineHeight: 22 },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: { textAlign: 'center', fontSize: 12, color: '#888' }
});

export default TermsOfServiceScreen;
