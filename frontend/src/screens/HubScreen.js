
// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   StatusBar,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Animated,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const { width } = Dimensions.get('window');
// const BIG_CARD_WIDTH = width * 0.86;
// const BIG_CARD_HEIGHT = BIG_CARD_WIDTH * 0.6;
// const AVATAR_SIZE = 64;

// const avatars = [
//   { id: 'a1', img: require('../assets/avatar1'), label: 'New', type: 'new' },
//   { id: 'a2', img: require('../assets/avatar2.jpg'), label: 'Online', type: 'online' },
//   { id: 'a3', img: require('../assets/avatar3.jpg'), label: 'Verified', type: 'verified' },
//   { id: 'a4', img: require('../assets/avatar4.jpg'), label: 'Active today', type: 'active' },
// ];

// const bigCards = [
//   { id: 'c1', img: require('../assets/Hiking.jpg'), title: 'Hiking & Backpack' },
//   { id: 'c2', img: require('../assets/NightOwl.jpg'), title: 'Night Owl' },
//   { id: 'c3', img: require('../assets/CrossingPath.jpg'), title: 'Frequent crossings' },
//   { id: 'c4', img: require('../assets/RollerSkate.jpg'), title: 'RollerSkate' },
// ];

// export default function HubScreen({ navigation }) {
//   const scrollX = useRef(new Animated.Value(0)).current;

//   const renderAvatar = ({ item }) => (
//     <View style={styles.avatarItem}>
//       <Image source={item.img} style={styles.avatarImage} />
//       <Text style={styles.avatarLabel}>{item.label}</Text>
//     </View>
//   );

//   const renderBigCard = ({ item, index }) => {
//     // Animated scale for a subtle "smooth movement"
//     const inputRange = [
//       (index - 1) * BIG_CARD_WIDTH,
//       index * BIG_CARD_WIDTH,
//       (index + 1) * BIG_CARD_WIDTH,
//     ];
//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.95, 1, 0.95],
//       extrapolate: 'clamp',
//     });

//     return (
//       <View style={{ width: BIG_CARD_WIDTH, alignItems: 'center' }}>
//         <Animated.View style={[styles.bigCard, { transform: [{ scale }] }]}>
//           <Image source={item.img} style={styles.bigCardImage} />
//           <View style={styles.bigCardOverlay} />
//           <Text style={styles.bigCardTitle}>{item.title}</Text>
//         </Animated.View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar barStyle="light-content" backgroundColor={styles.safe.backgroundColor} />
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Hub</Text>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.iconBubble}>
//             <Icon name="notifications-outline" size={20} color="#fff" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.avatarBubble}>
//             <Image source={require('../../assets/me.jpg')} style={styles.meAvatar} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={{ paddingBottom: 36 }}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* big promo card top (CrushTime) */}
//         <View style={styles.promoWrap}>
//           <View style={styles.promoCard}>
//             <Text style={styles.promoTitle}>CrushTime</Text>
//             <Text style={styles.promoSub}>You don't have enough Likes to play.{"\n"}Boost your profile for more visibility!</Text>
//             <TouchableOpacity style={styles.boostBtn}>
//               <MaterialIcons name="bolt" size={18} color="#fff" />
//               <Text style={styles.boostBtnText}>Boost my profile</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Explore header */}
//         <Text style={styles.sectionTitle}>Explore</Text>

//         {/* Featured big horizontally scrollable card */}
//         <View style={{ paddingVertical: 6 }}>
//           <Animated.FlatList
//             data={bigCards}
//             keyExtractor={(i) => i.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             snapToInterval={BIG_CARD_WIDTH}
//             decelerationRate="fast"
//             bounces={false}
//             contentContainerStyle={{ paddingHorizontal: (width - BIG_CARD_WIDTH) / 2 }}
//             onScroll={Animated.event(
//               [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//               { useNativeDriver: true }
//             )}
//             renderItem={renderBigCard}
//           />
//         </View>

//         {/* avatars row */}
//         <View style={styles.avatarsRow}>
//           <FlatList
//             data={avatars}
//             keyExtractor={(i) => i.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             renderItem={renderAvatar}
//             contentContainerStyle={{ paddingHorizontal: 12 }}
//           />
//         </View>

//         {/* Meet section */}
//         <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Meet</Text>
//         <View style={styles.pillRow}>
//           <TouchableOpacity style={[styles.pill, styles.pillActive]}>
//             <Text style={[styles.pillText, styles.pillTextActive]}>Travel Style</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.pill, styles.pillInactive]}>
//             <Text style={[styles.pillText, styles.pillTextInactive]}>Lifestyle</Text>
//           </TouchableOpacity>
//         </View>

//         {/* smaller horizontally scrollable cards (like meet categories) */}
//         <View style={{ marginTop: 12 }}>
//           <FlatList
//             data={bigCards}
//             keyExtractor={(i) => 'm-' + i.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 12 }}
//             renderItem={({ item }) => (
//               <TouchableOpacity style={styles.meetCard}>
//                 <Image source={item.img} style={styles.meetImage} />
//                 <View style={styles.meetOverlay} />
//                 <Text style={styles.meetTitle}>{item.title}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>

//         {/* add some bottom spacing */}
//         <View style={{ height: 80 }} />
//       </ScrollView>

//       {/* bottom tab (static for UI) */}
//       <View style={styles.bottomTab}>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="repeat" size={24} color="#bfbfbf" />
//           <Text style={styles.tabText}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItemActive}>
//           <Icon name="grid" size={24} color="#fff" />
//           <Text style={[styles.tabText, { color: '#fff' }]}>Hub</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="walk" size={24} color="#bfbfbf" />
//           <Text style={styles.tabText}>Map</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="heart-outline" size={24} color="#bfbfbf" />
//           <Text style={styles.tabText}>Likes</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Icon name="chatbubble-ellipses-outline" size={24} color="#bfbfbf" />
//           <Text style={styles.tabText}>Chat</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: '#0f0f0e', // deep dark
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 0,
//   },
//   header: {
//     height: 64,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconBubble: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     backgroundColor: '#1a1a18',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   avatarBubble: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   meAvatar: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },

//   promoWrap: {
//     paddingHorizontal: 16,
//     paddingBottom: 6,
//   },
//   promoCard: {
//     backgroundColor: '#bdeef0', // aqua feel like screenshot
//     borderRadius: 18,
//     padding: 18,
//     minHeight: 120,
//     justifyContent: 'center',
//     overflow: 'hidden',
//   },
//   promoTitle: {
//     fontSize: 34,
//     fontWeight: '800',
//     color: '#0e0e0e',
//   },
//   promoSub: {
//     marginTop: 6,
//     color: '#1a1a1a',
//     fontSize: 14,
//   },
//   boostBtn: {
//     marginTop: 12,
//     alignSelf: 'flex-start',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     backgroundColor: '#0e0e0e',
//   },
//   boostBtnText: {
//     color: '#fff',
//     marginLeft: 8,
//     fontWeight: '600',
//   },

//   sectionTitle: {
//     color: '#fff',
//     fontSize: 36,
//     fontWeight: '800',
//     paddingHorizontal: 16,
//     marginTop: 16,
//   },

//   bigCard: {
//     width: BIG_CARD_WIDTH,
//     height: BIG_CARD_HEIGHT,
//     borderRadius: 24,
//     overflow: 'hidden',
//     backgroundColor: '#222',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bigCardImage: {
//     ...StyleSheet.absoluteFillObject,
//     resizeMode: 'cover',
//   },
//   bigCardOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.28)',
//   },
//   bigCardTitle: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: '700',
//     textAlign: 'center',
//     paddingHorizontal: 12,
//   },

//   avatarsRow: {
//     marginTop: 18,
//   },
//   avatarItem: {
//     width: AVATAR_SIZE + 20,
//     alignItems: 'center',
//     marginHorizontal: 8,
//   },
//   avatarImage: {
//     width: AVATAR_SIZE,
//     height: AVATAR_SIZE,
//     borderRadius: 16,
//     resizeMode: 'cover',
//   },
//   avatarLabel: {
//     color: '#eae8e3',
//     marginTop: 6,
//     fontSize: 12,
//     textAlign: 'center',
//   },

//   pillRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     marginTop: 8,
//   },
//   pill: {
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 999,
//     marginRight: 12,
//   },
//   pillActive: {
//     backgroundColor: '#f2efe8',
//   },
//   pillInactive: {
//     backgroundColor: '#1a1a18',
//   },
//   pillText: {
//     fontWeight: '700',
//   },
//   pillTextActive: {
//     color: '#111',
//   },
//   pillTextInactive: {
//     color: '#e0ded9',
//   },

//   meetCard: {
//     width: BIG_CARD_WIDTH * 0.8,
//     height: BIG_CARD_HEIGHT * 0.9,
//     borderRadius: 20,
//     overflow: 'hidden',
//     marginRight: 12,
//     backgroundColor: '#222',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   meetImage: {
//     ...StyleSheet.absoluteFillObject,
//     resizeMode: 'cover',
//   },
//   meetOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.28)',
//   },
//   meetTitle: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: '700',
//     textAlign: 'center',
//     paddingHorizontal: 8,
//   },

//   bottomTab: {
//     height: 74,
//     borderTopWidth: 0,
//     backgroundColor: '#0f0f0e',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     paddingBottom: 6,
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   tabItem: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tabItemActive: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#1a1a18',
//     paddingVertical: 8,
//     paddingHorizontal: 18,
//     borderRadius: 14,
//   },
//   tabText: {
//     fontSize: 11,
//     color: '#bfbfbf',
//     marginTop: 2,
//   },
// });



import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const BIG_CARD_WIDTH = width * 0.86;
const BIG_CARD_HEIGHT = BIG_CARD_WIDTH * 0.6;
const AVATAR_SIZE = 64;

const avatars = [
    { id: 'a1', img: require('../assets/avatar1.jpg'), label: 'New', type: 'new' },
    { id: 'a2', img: require('../assets/avatar2.jpg'), label: 'Online', type: 'online' },
    { id: 'a3', img: require('../assets/avatar3.jpg'), label: 'Verified', type: 'verified', },
    { id: 'a4', img: require('../assets/avatar4.jpg'), label: 'Active today', type: 'active' },
];

const bigCards = [
    { id: 'c1', img: require('../assets/Hiking.jpg'), title: 'Hiking & Backpack' },
    { id: 'c2', img: require('../assets/NightOwl.jpg'), title: 'Night Owl' },
    { id: 'c3', img: require('../assets/CrossingPath.jpg'), title: 'Frequent crossings' },
    { id: 'c4', img: require('../assets/RollerSkate.jpg'), title: 'RollerSkate' },
];

export default function HubScreen({ navigation }) {
    const scrollX = useRef(new Animated.Value(0)).current;

    
    const [activePill, setActivePill] = useState('Travel Style');
    const pills = ['Travel Style', 'Lifestyle'];

    const renderAvatar = ({ item }) => (
        <View style={styles.avatarItem}>
            <Image source={item.img} style={styles.avatarImage} />
            <Text style={styles.avatarLabel}>{item.label}</Text>
        </View>
    );

    const renderBigCard = ({ item, index }) => {
        const inputRange = [
            (index - 1) * BIG_CARD_WIDTH,
            index * BIG_CARD_WIDTH,
            (index + 1) * BIG_CARD_WIDTH,
        ];
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.95, 1, 0.95],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ width: BIG_CARD_WIDTH, alignItems: 'center' }}>
                <Animated.View style={[styles.bigCard, { transform: [{ scale }] }]}>
                    <Image source={item.img} style={styles.bigCardImage} />
                    <View style={styles.bigCardOverlay} />
                    <Text style={styles.bigCardTitle}>{item.title}</Text>
                </Animated.View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="light-content" backgroundColor={styles.safe.backgroundColor} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Hub</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBubble}>
                        <Ionicons name="notifications" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.avatarBubble} onpress={() => navigation.navigate('ProfileDashboard')}>
                        <Image source={require('../assets/profile.jpg')} style={styles.meAvatar} />

                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 36 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.promoWrap}>
                    <View style={styles.promoCard}>
                        <Text style={styles.promoTitle}>CrushTime</Text>
                        <Text style={styles.promoSub}>
                            You don't have enough Likes to play.{"\n"}Boost your profile for more visibility!
                        </Text>
                        <TouchableOpacity style={styles.boostBtn} onPress={() => navigation.navigate('BoostMyProfile')}>
                            <MaterialIcons name="bolt" size={18} color="#fff" />
                            <Text style={styles.boostBtnText}>Boost my profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Explore</Text>

                <View style={{ paddingVertical: 6 }}>
                    <Animated.FlatList
                        data={bigCards}
                        keyExtractor={(i) => i.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={BIG_CARD_WIDTH}
                        decelerationRate="fast"
                        bounces={false}
                        contentContainerStyle={{ paddingHorizontal: (width - BIG_CARD_WIDTH) / 2 }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        renderItem={renderBigCard}
                    />
                </View>

                <View style={styles.avatarsRow}>
                    <FlatList
                        data={avatars}
                        keyExtractor={(i) => i.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderAvatar}
                        contentContainerStyle={{ paddingHorizontal: 12 }}
                    />
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Meet</Text>

                
                <View style={styles.pillRow}>
                    {pills.map((pill) => {
                        const isActive = activePill === pill;
                        return (
                            <TouchableOpacity
                                key={pill}
                                style={[styles.pill, isActive ? styles.pillActive : styles.pillInactive]}
                                onPress={() => setActivePill(pill)}
                            >
                                <Text style={[styles.pillText, isActive ? styles.pillTextActive : styles.pillTextInactive]}>
                                    {pill}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={{ marginTop: 12 }}>
                    <FlatList
                        data={bigCards}
                        keyExtractor={(i) => 'm-' + i.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 12 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.meetCard}>
                                <Image source={item.img} style={styles.meetImage} />
                                <View style={styles.meetOverlay} />
                                <Text style={styles.meetTitle}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <View style={{ height: 80 }} />
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate("UserProfileScreen")}>
                    <Ionicons name="home-outline" size={22} color="#964B00" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("HubScreen")}>
                    <Ionicons name="grid-outline" size={22} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
                    <Ionicons name="map-outline" size={22} color="#4cef0cff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("LikesScreen")}>
                    <Ionicons name="heart-outline" size={22} color="#de0d0dff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
                    <Ionicons name="chatbubble-outline" size={22} color="#3139cfff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0f0f0e', 
    },
    container: {
        flex: 1,
        paddingHorizontal: 0,
    },
    header: {
        height: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBubble: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#1a1a18',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    avatarBubble: {
        width: 40,
        height: 40,
        borderRadius: 10,
        overflow: 'hidden',
    },
    meAvatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    promoWrap: {
        paddingHorizontal: 16,
        paddingBottom: 6,
    },
    promoCard: {
        backgroundColor: '#bdeef0', 
        borderRadius: 18,
        padding: 18,
        minHeight: 120,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    promoTitle: {
        fontSize: 34,
        fontWeight: '800',
        color: '#0e0e0e',
    },
    promoSub: {
        marginTop: 6,
        color: '#1a1a1a',
        fontSize: 14,
    },
    boostBtn: {
        marginTop: 12,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        backgroundColor: '#0e0e0e',
    },
    boostBtnText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '600',
    },

    sectionTitle: {
        color: '#fff',
        fontSize: 36,
        fontWeight: '800',
        paddingHorizontal: 16,
        marginTop: 16,
    },

    bigCard: {
        width: BIG_CARD_WIDTH,
        height: BIG_CARD_HEIGHT,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigCardImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    bigCardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.28)',
    },
    bigCardTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        paddingHorizontal: 12,
    },

    avatarsRow: {
        marginTop: 18,
    },
    avatarItem: {
        width: AVATAR_SIZE + 20,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    avatarImage: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: 16,
        resizeMode: 'cover',
    },
    avatarLabel: {
        color: '#eae8e3',
        marginTop: 6,
        fontSize: 12,
        textAlign: 'center',
    },

    pillRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 8,
    },
    pill: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 999,
        marginRight: 12,
    },
    pillActive: {
        backgroundColor: '#f2efe8',
    },
    pillInactive: {
        backgroundColor: '#1a1a18',
    },
    pillText: {
        fontWeight: '700',
    },
    pillTextActive: {
        color: '#111',
    },
    pillTextInactive: {
        color: '#e0ded9',
    },

    meetCard: {
        width: BIG_CARD_WIDTH * 0.8,
        height: BIG_CARD_HEIGHT * 0.9,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 12,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    meetImage: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    meetOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.28)',
    },
    meetTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        paddingHorizontal: 8,
    },

    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
        backgroundColor: "#fff"
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    tabItemActive: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a18',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 14,
    },
    tabText: {
        fontSize: 11,
        color: '#bfbfbf',
        marginTop: 2,
    },
});
