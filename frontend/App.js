// import React from 'react';
// import { StatusBar, StyleSheet, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native'; // Correct import for NavigationContainer
// import { createStackNavigator } from '@react-navigation/stack'; // Correct import for StackNavigator
// import LuvsiLoginPage from './src/screens/GetStarted'; // Adjust path as needed
// import Button from './src/components/button'; // Adjust path as needed
// import CityScreen from './src/screens/CityScreen';
// import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
// // import { StackScreen } from 'react-native-screens';
// import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
// import AuthScreen from './src/screens/AuthScreen';
// import NameScreen from './src/screens/NameScreen';
// import DateOfBirthScreen from './src/screens/DateOfBirthScreen';
// import GenderScreen from './src/screens/GenderScreen';
// import SignScreen from './src/screens/SignScreen';
// import EducationScreen from './src/screens/EducationScreen';
// import HeightScreen from './src/screens/HeightScreen';
// import PleasureScreen from './src/screens/PleasureScreen';
// import LookingForScreen from './src/screens/LookingForScreen';
// import AddPhotosScreen from './src/screens/AddPhotosScreen';
// import FindCrushScreen from './src/screens/FindCrushScreen';
// import LocationPermissionScreen from './src/screens/LocationPermissionScreen';
// import FavouritePlacesScreen from './src/screens/FavouritePlaceScreen';
// import PersonalityScreen from './src/screens/PersonalityScreen';
// import UserProfileScreen from './src/screens/UserProfileScreen';
// import ProfileDashboard from './src/screens/ProfileDashboard';

// // Create the stack navigator instance
// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="LuvsiLoginPage">
//         <Stack.Screen name="LuvsiLoginPage" component={LuvsiLoginPage} options={{ headerShown: false }}  />
//         <Stack.Screen name="AuthScreen" component={AuthScreen} />
//         <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
//         <Stack.Screen name='TermsOfServiceScreen' component={TermsOfServiceScreen} />
//         <Stack.Screen name="CityScreen" component={CityScreen}   />
//         <Stack.Screen name="NameScreen" component={NameScreen}  />
//         <Stack.Screen name="DateOfBirthScreen" component={DateOfBirthScreen}  />
//         <Stack.Screen name='GenderScreen' component={GenderScreen}  />
//         <Stack.Screen name='HeightScreen' component={HeightScreen}  />
//         <Stack.Screen name='SignScreen' component={SignScreen}  />
//         <Stack.Screen name='EducationScreen' component={EducationScreen}  />
//         <Stack.Screen name='PleasureScreen' component={PleasureScreen} options={{headerShown:false}}/>
//         <Stack.Screen name='LookingForScreen' component={LookingForScreen} options={{headerShown:false}}/>
//         <Stack.Screen name='AddPhotosScreen' component={AddPhotosScreen} options={{headerShown:false}}/>
//         <Stack.Screen name='FindCrushScreen' component={FindCrushScreen} options={{headerShown:false}}/>
//         <Stack.Screen name='LocationPermissionScreen' component={LocationPermissionScreen} options={{headerShown:false}}/>
//         <Stack.Screen name='FavouritePlacesScreen' component={FavouritePlacesScreen} options={{headerShown:false}}/>
//         <Stack.Screen name='PersonalityScreen' component={PersonalityScreen} options={{headerShown:false}}/>
//         <Stack.Screen name='UserProfileScreen' component={UserProfileScreen} options={{headerShown:false}}/>
//         <Stack.Screen name='ProfileDashboard' component={ProfileDashboard} options={{headerShown:false}}/>

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const NextPage = () => {
//   return (
//     <SafeAreaView style={styles.pageContainer}>
//       <StatusBar barStyle="dark-content" />
//       <Text style={styles.heading}>Next Page</Text>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFEBEE',
//   },
//   pageContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFEBEE',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });


import React from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// ✅ Screens (exact names from your directory)
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

// ✅ Create Stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LuvsiLoginPage">

        <Stack.Screen name="LuvsiLoginPage" component={LuvsiLoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} />
        <Stack.Screen name="CityScreen" component={CityScreen} />
        <Stack.Screen name="NameScreen" component={NameScreen} />
        <Stack.Screen name="DateOfBirthScreen" component={DateOfBirthScreen} />
        <Stack.Screen name="GenderScreen" component={GenderScreen} />
        <Stack.Screen name="HeightScreen" component={HeightScreen} />
        <Stack.Screen name="SignScreen" component={SignScreen} />
        <Stack.Screen name="EducationScreen" component={EducationScreen} />

        {/* Screens with header hidden */}
        <Stack.Screen name="PleasureScreen" component={PleasureScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LookingForScreen" component={LookingForScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddPhotosScreen" component={AddPhotosScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FindCrushScreen" component={FindCrushScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FavouritePlacesScreen" component={FavouritePlacesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalityScreen" component={PersonalityScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileDashboard" component={ProfileDashboard} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ✅ Example next page (for testing)
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
