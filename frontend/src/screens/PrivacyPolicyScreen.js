
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; 

const PrivacyPolicyScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={28} color="#000" />

      </TouchableOpacity>

      <Text style={styles.heading}>We respect your data and privacy</Text>
      <ScrollView style={styles.content}>

        <Text style={styles.text}>
          At \[Your Company Name], we are committed to safeguarding the privacy of every individual who uses our services. When you interact with our website, mobile application, or other digital platforms, we collect certain personal information that helps us deliver, improve, and secure our services. The primary details we collect include your name, email address, and profile photo. Your name allows us to personalize your experience, ensure smooth account management, and verify your identity when required. Your email address is crucial for communication purposes, including account creation, login authentication, important notifications, customer support responses, and, if you choose to opt in, updates regarding new features or promotional offers. If you provide a profile photo, it is stored to make your experience more engaging and personalized. Apart from the information you voluntarily provide, we also automatically collect technical details such as your IP address, browser type, device identifiers, and system activity whenever you access our services. These details are important for improving performance, diagnosing errors, and enhancing security.

          In addition to personal details, we collect information about how you interact with our services. Usage data such as the pages you visit, the time you spend on our platform, the actions you perform, and any error reports generated during your session help us identify patterns, refine our interface, and deliver a smoother experience. To facilitate these functions, we use cookies and tracking technologies. Cookies allow us to remember your login sessions, save your preferences like language or theme, and recognize you when you return to our platform. While you may disable cookies in your browser settings, doing so may restrict certain functionalities. Furthermore, when financial transactions take place, we partner with **Stripe**, a globally trusted payment processor. Stripe ensures that sensitive payment details such as your card number or billing address are processed securely. We do not store or retain such details on our servers; instead, Stripe manages them in accordance with its own privacy policy, ensuring a high level of encryption and compliance with financial regulations.

          Communication is another critical aspect of our data use. When you reach out to us via email, forms, or chat, we may retain the content of your communication to resolve your queries efficiently and to improve our customer support. To send important updates, transactional emails, and newsletters, we rely on **Sendinblue**, a secure email and communication service provider. Your email address and preferences may be stored within Sendinblue’s system solely to ensure that you receive timely and relevant messages. For certain intelligent features such as chat assistance, automated replies, or content recommendations, we make use of **OpenAI’s services**. While user inputs may pass through OpenAI’s system for processing, this data is used strictly for delivering functionalities and is not exploited for advertising or unrelated purposes. These third-party integrations are carefully chosen to enhance our services without compromising your privacy.

          The information we collect is primarily used to improve the overall quality of our services. We analyze user behavior to understand what works best and where improvements are needed. We use aggregated and anonymized data for research and performance optimization, which helps us in developing new features and delivering better value to our users. Your personal data also plays an essential role in ensuring security. By monitoring login attempts, tracking unusual patterns, and applying fraud detection techniques, we protect both you and our platform from unauthorized access or malicious activity. Security is a shared responsibility, and we continuously work to safeguard your data through encryption technologies, restricted access, and regular audits of our systems.

          We are transparent about how we share your data. Unlike some organizations, we do not sell, rent, or trade your information with third parties. The only circumstances under which we share your information are limited to trusted service providers such as **Stripe, OpenAI, and Sendinblue** who act on our behalf to deliver specific services. In rare cases, we may also disclose information if required to do so by law, regulatory bodies, or valid legal processes. Additionally, in the event of a merger, acquisition, or business transfer, user data may be part of the transferred assets to ensure service continuity. Beyond these scenarios, your data remains within our secured systems and is used only for the purposes explicitly outlined in this policy.

          We also respect the legal rights you have over your data. Depending on where you live, such as in Europe under the **GDPR** or in California under the **CCPA**, you may have the right to request access to the data we hold about you, the right to correct inaccurate details, the right to delete your personal information when it is no longer needed, and the right to restrict or object to certain processing activities. You may also request a portable copy of your data in a structured, commonly used format. If you previously gave consent for receiving promotional communications, you always have the right to withdraw that consent at any time. We provide simple mechanisms to exercise these rights, and we strive to respond to all requests within legally mandated timeframes. Respecting user rights is a core principle of our operations.

          When it comes to retention, we only keep your information for as long as necessary to provide our services, meet legal requirements, resolve disputes, and enforce our agreements. Once the data is no longer needed, we delete or anonymize it in a secure manner. Retention periods vary depending on the type of data and the purpose for which it was collected. For example, transactional records may be retained longer to comply with financial regulations, while support queries may be deleted once the matter has been resolved. We believe in minimizing the amount of personal data stored, reducing risks, and keeping your information only for as long as it is useful.

          Children’s privacy is another area we take seriously. Our services are not directed toward children under the age of 13 (or the equivalent minimum age under local laws). We do not knowingly collect data from minors, and if we become aware that a child has provided personal information, we take immediate steps to delete it. Parents or guardians who believe their child may have submitted data to us are encouraged to contact us immediately so we can address the matter. This ensures that our services remain safe and appropriate for the intended audience.

          Because we operate in a global digital environment, your data may be transferred across international borders. For instance, servers may be located in different regions, and our service providers like Stripe or Sendinblue may process data in countries outside your own. Regardless of where your data is processed, we take measures to ensure that it is protected under strict privacy safeguards and in compliance with international data protection standards. This may include contractual agreements, encryption, and adherence to frameworks such as the EU-U.S. Data Privacy Framework or other applicable mechanisms.

          Our commitment to privacy does not end with the present. As technologies evolve, user expectations change, and new legal requirements emerge, we may update this section of our Privacy Policy. Whenever we make significant changes, we will notify users through email or a clear notice on our platform. We encourage all users to review the Privacy Policy periodically to stay informed about how their data is being handled. By continuing to use our services after updates are posted, you acknowledge and accept the revised terms.

          In conclusion, the collection and use of information at \[Your Company Name] is driven by the principles of transparency, necessity, and security. We collect only what is essential, we use it solely to deliver and improve our services, and we share it only with trusted partners under strict conditions. We value your trust above all else and continuously invest in security measures, compliance, and user empowerment to maintain that trust. If you ever have concerns or questions about how your data is handled, you can reach out to us directly at **privacy@\[yourcompany].com**. Your privacy and security remain at the heart of everything we do, and we are committed to ensuring that your experience with us is safe, reliable, and respectful of your personal rights.


        </Text>
      </ScrollView>

      
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setIsChecked(!isChecked)}
      >
        <Icon
          name={isChecked ? 'checkbox' : 'square-outline'}
          size={28}
          color={isChecked ? '#f9748f' : '#999'}
        />
        <Text style={styles.checkboxText}>I agree with this privacy policy</Text>
      </TouchableOpacity>

      
      <LinearGradient
        colors={['#f78ca0', '#f9748f']}
        style={[styles.button, { opacity: isChecked ? 1 : 0.5 }]}
      >
        <TouchableOpacity
          disabled={!isChecked}
          onPress={() => navigation.navigate('CityScreen')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text style={styles.footer}>
        Read our cookie policy to learn more
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  content: { marginBottom: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, padding: 40 },
  text: { fontSize: 16, color: '#333', marginBottom: 15, lineHeight: 22 },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333'
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: { textAlign: 'center', fontSize: 12, color: '#888' }
});

export default PrivacyPolicyScreen;
