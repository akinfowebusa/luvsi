// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ImageBackground
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';

// const LoginScreen = ({ navigation }) => {
//     return (
//         <ImageBackground
//             source={require('../assets/login-background.jpg')} // ✅ apni image ka path daalo
//             style={styles.background}
//             resizeMode="cover" // "cover", "contain" ya "stretch" try kar sakte ho
//         >
//             <SafeAreaView style={styles.container}>
//                 {/* Back Button */}
//                 <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//                     <Icon name="arrow-back" size={24} color="#fff" />
//                 </TouchableOpacity>

//                 {/* Title */}
//                 <View style={styles.titleContainer}>
//                     <Text style={styles.title}>Luvsi</Text>
//                 </View>

//                 {/* Social Buttons */}
//                 <View style={styles.buttonContainer}>
//                     {/* Google Button */}
//                     <TouchableOpacity
//                         style={[
//                             styles.socialButton,
//                             { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' }
//                         ]}
//                         onPress={() => navigation.navigate('UserProfileScreen')}
//                     >
//                         <Icon name="logo-google" size={20} color="#333" style={styles.icon} />
//                         <Text style={[styles.socialText, { color: '#333' }]}>
//                             Continue with Google
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Footer */}
//                 <Text style={styles.footerText}>
//                     when you sign up, you accept our
//                     <Text
//                         style={styles.link}
//                         onPress={() => navigation.navigate('TermsOfServiceScreen')}
//                     >
//                         {' '}
//                         terms of service{' '}
//                     </Text>
//                     and our
//                     <Text
//                         style={styles.link}
//                         onPress={() => navigation.navigate('PrivacyPolicyScreen')}
//                     >
//                         {' '}
//                         privacy policy
//                     </Text>
//                     .
//                 </Text>
//             </SafeAreaView>
//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//     },
//     container: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.3)', // ✅ optional: dark overlay for better text visibility
//         paddingHorizontal: 20
//     },
//     backButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10
//     },
//     titleContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     title: {
//         fontSize: 36,
//         fontWeight: 'bold',
//         color: '#fff'
//     },
//     buttonContainer: {
//         marginBottom: 40
//     },
//     socialButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 15,
//         borderRadius: 50,
//         marginBottom: 15,
//         justifyContent: 'center'
//     },
//     icon: {
//         marginRight: 10
//     },
//     socialText: {
//         fontSize: 16,
//         fontWeight: '600'
//     },
//     footerText: {
//         textAlign: 'center',
//         fontSize: 12,
//         color: '#fff',
//         marginBottom: 10
//     },
//     link: {
//         color: '#FFD700',
//         fontWeight: '600'
//     }
// });

// export default LoginScreen;



import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios'; 
const LoginScreen = ({ navigation }) => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('Google User Info:', userInfo);

            
            const response = await axios.post('https://your-backend.com/api/checkUser', {
                email: userInfo.user.email
            });

            const isExistingUser = response.data.exists;

            if (isExistingUser) {
                
                navigation.navigate('UserProfileScreen', { user: userInfo });
            } else {
                
                navigation.navigate('TermsOfServiceScreen', { user: userInfo });
            }

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Login cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Login in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Google Play Services not available');
            } else {
                Alert.alert('Something went wrong', error.message);
            }
        }
    };

    return (
        <ImageBackground
            source={require('../assets/login-background.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Luvsi</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.socialButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' }]}
                        onPress={signInWithGoogle}
                    >
                        <Icon name="logo-google" size={20} color="#333" style={styles.icon} />
                        <Text style={[styles.socialText, { color: '#333' }]}>Continue with Google</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>
                    when you sign up, you accept our
                    <Text
                        style={styles.link}
                        onPress={() => navigation.navigate('TermsOfServiceScreen')}
                    >
                        {' '}terms of service{' '}
                    </Text>
                    and our
                    <Text
                        style={styles.link}
                        onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                    >
                        {' '}privacy policy
                    </Text>
                    .
                </Text>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, width: '100%', height: '100%' },
    container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 20 },
    backButton: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    titleContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
    buttonContainer: { marginBottom: 40 },
    socialButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderRadius: 50, marginBottom: 15, justifyContent: 'center' },
    icon: { marginRight: 10 },
    socialText: { fontSize: 16, fontWeight: '600' },
    footerText: { textAlign: 'center', fontSize: 12, color: '#fff', marginBottom: 10 },
    link: { color: '#FFD700', fontWeight: '600' }
});

export default LoginScreen;
