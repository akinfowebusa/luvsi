import React from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LuvsiLoginPage from './src/screens/GetStarted';
import Button from './src/components/button';
import CityScreen from './src/screens/CityScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
import AuthScreen from './src/screens/AuthScreen';
import NameScreen from './src/screens/NameScreen';
import DateOfBirthScreen from './src/screens/DateOfBirthScreen';
import GenderScreen from './src/screens/GenderScreen';
import SignScreen from './src/screens/SignScreen';
import EducationScreen from './src/screens/EducationScreen';
import HeightScreen from './src/screens/HeightScreen';
import PleasureScreen from './src/screens/PleasureScreen';
import LookingForScreen from './src/screens/LookingForScreen';
import AddPhotosScreen from './src/screens/AddPhotosScreen';
import FindCrushScreen from './src/screens/FindCrushScreen';
import LocationPermissionScreen from './src/screens/LocationPermissionScreen';
import FavouritePlacesScreen from './src/screens/FavouritePlaceScreen';
import PersonalityScreen from './src/screens/PersonalityScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import ProfileDashboard from './src/screens/ProfileDashboard';
import ExerciseScreen from './src/screens/ExerciseScreen';
import SmokeScreen from './src/screens/SmokeScreen';
import KidScreen from './src/screens/KidScreen';
import LoadingAnimationScreen from './src/components/LoadingAnimationScreen';
import EditScreen from './src/screens/EditScreen';
import LoginScreen from './src/screens/LoginScreen';
import HubScreen from './src/screens/HubScreen';
import BoostMyProfile from './src/screens/BoostMyProfile';
import LuvsiPremiumScreen from './src/screens/LuvsiPremiumScreen';
import LikesScreen from './src/screens/LikesScreen';
import ChatScreen from './src/screens/ChatScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import PreferenceScreen from './src/screens/PreferenceScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import NotificationSettingsScreen from './src/screens/NotificationSettingsScreen';
import MyDataScreen from './src/screens/MyDataScreen';
import DeactivateScreen from './src/screens/DeactivateScreen';
import MessageScreen from './src/screens/MessageScreen';
import DMScreen from './src/screens/DMScreen';
import VideoCallScreen from './src/screens/VideoCallScreen';
import LoadingSpinner from './src/components/LoadingSpinner';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LuvsiLoginPage">

        <Stack.Screen name="LuvsiLoginPage" component={LuvsiLoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="AuthScreen" component={AuthScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="CityScreen" component={CityScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="NameScreen" component={NameScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="DateOfBirthScreen" component={DateOfBirthScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="GenderScreen" component={GenderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HeightScreen" component={HeightScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignScreen" component={SignScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EducationScreen" component={EducationScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="ExerciseScreen" component={ExerciseScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="SmokeScreen" component={SmokeScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="KidScreen" component={KidScreen}  options={{ headerShown: false }} />
         <Stack.Screen name="HubScreen" component={HubScreen}  options={{ headerShown: false }} />
         <Stack.Screen name="BoostMyProfile" component={BoostMyProfile}  options={{ headerShown: false }} />
        <Stack.Screen name="LuvsiPremiumScreen" component={LuvsiPremiumScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown:false}}/>
        <Stack.Screen name="PleasureScreen" component={PleasureScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LookingForScreen" component={LookingForScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddPhotosScreen" component={AddPhotosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FindCrushScreen" component={FindCrushScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FavouritePlacesScreen" component={FavouritePlacesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalityScreen" component={PersonalityScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileDashboard" component={ProfileDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="LoadingAnimationScreen" component={LoadingAnimationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditScreen" component={EditScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LikesScreen" component={LikesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PreferenceScreen" component={PreferenceScreen} options={{ headerShown: false }} />
        <Stack.Screen name= "SettingsScreen" component={SettingsScreen} options={{headerShown : false}  } />
        <Stack.Screen name = "NotificationSettingsScreen" component={NotificationSettingsScreen} options={{headerShown : false}} />
        <Stack.Screen name = "MyDataScreen" component={MyDataScreen} options={{headerShown: false}}/>
        <Stack.Screen name='DeactivateScreen' component={DeactivateScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'MessageScreen' component={MessageScreen} options= {{headerShown : false}}/>
        <Stack.Screen name='DMScreen' component={DMScreen} options={{headerShown : false}}/>
        <Stack.Screen name= 'VideoCallScreen' component={VideoCallScreen} options={{headerShown : false}} />
        <Stack.Screen name='LoadingSpinner' component={LoadingSpinner} options={{headerShown : false}}/>
 

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const NextPage = () => {
  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.heading}>Next Page</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE',
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
