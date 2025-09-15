import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons'; // For icons

const AuthScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="chevron-back" size={22} color="#333" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Luvsi </Text>
            </View>

            {/* Social Buttons */}
            <View style={styles.buttonContainer}>
                {/* Apple Button */}
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000' }]}>
                    <Icon name="logo-apple" size={20} color="#fff" style={styles.icon} />
                    <Text style={[styles.socialText, { color: '#fff' }]}>Connect with Apple</Text>
                </TouchableOpacity>

                {/* Google Button
        <TouchableOpacity
          style={[
            styles.socialButton,
            { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' }
          ]}
        >
          <Icon name="logo-google" size={20} color="#333" style={styles.icon} />
          <Text style={[styles.socialText, { color: '#333' }]}>Connect with Google</Text>
        </TouchableOpacity> */}

                {/* Google Button */}
                <TouchableOpacity
                    style={[
                        styles.socialButton,
                        { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' }
                    ]}
                   onPress={() => navigation.navigate('TermsOfServiceScreen')}  // ✅ Navigation added
                >
                    <Icon name="logo-google" size={20} color="#333" style={styles.icon} />
                    <Text style={[styles.socialText, { color: '#333' }]}>Connect with Googllle</Text>
                    
                </TouchableOpacity>


                {/* Facebook Button */}
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3b5998' }]}>
                    <Icon name="logo-facebook" size={20} color="#fff" style={styles.icon} />
                    <Text style={[styles.socialText, { color: '#fff' }]}>Connect with Facebook</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <Text style={styles.footerText}>
                when you sign up, you accept our
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('TermsOfServiceScreen')}
                >
                    {' '}
                    terms of service{' '}
                </Text>
                and our
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                >
                    {' '}
                    privacy policy
                </Text>
                .
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8BBD0', // Light pink
        paddingHorizontal: 20
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    backText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 5
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonContainer: {
        marginBottom: 40
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 50,
        marginBottom: 15,
        justifyContent: 'center'
    },
    icon: {
        marginRight: 10
    },
    socialText: {
        fontSize: 16,
        fontWeight: '600'
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#444',
        marginBottom: 10
    },
    link: {
        color: '#d6336c',
        fontWeight: '600'
    }
});

export default AuthScreen;
