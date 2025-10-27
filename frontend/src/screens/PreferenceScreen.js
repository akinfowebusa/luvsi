import react from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"; 
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";



const PreferenceScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={28} color="#000" onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }} />
                <Text style={styles.headerTitle}>Preference</Text>   
            </View>
            <View style={styles.content}>
                <Text style={styles.infoText}>Standard preferences</Text>
            </View>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("GenderSelectionScreen")}>
                <Ionicons name="people" size={20} color="#000" />
                <Text style={styles.optionText}>Gender</Text>
                <Ionicons name="chevron-forward" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("AgeRangeScreen")}>
                <Ionicons name="calendar" size={20} color="#000" />
                <Text style={styles.optionText}>Age Range</Text>
                <Ionicons name="chevron-forward" size={20} color="#000" />
            </TouchableOpacity>

            <Text style={styles.infoText}>Advanced Filters</Text>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("LuvsiPremiumScreen")}>
                <Ionicons name="" size={20} color="#000" />
                <Text style={styles.optionText}>Kids</Text>
                <Ionicons name="chevron-forward" size={20} color="#000" />
            </TouchableOpacity>

             <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("LuvsiPremiumScreen")}>
                <Ionicons name="" size={20} color="#000" />
                <Text style={styles.optionText}>Smoking</Text>
                <Ionicons name="chevron-forward" size={20} color="#000" />
            </TouchableOpacity>

             <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("LuvsiPremiumScreen")}>
                <Ionicons name="scale" size={20} color="#000" />
                <Text style={styles.optionText}>Height</Text>
                <Ionicons name="chevron-forward" size={20} color="#000" />
            </TouchableOpacity>


             <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("LuvsiPremiumScreen")}>
                <Ionicons name="search" size={20} color="#000" />
        
                <Text style={styles.optionText}>I'm here for</Text>
                <Ionicons name="chevron-forward" size={20} color="#000" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default PreferenceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        backgroundColor: "#FAF4EF",
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",

        textAlign: "center",
    },
    content: {
        marginBottom: 20,
    },
    infoText: { 
        fontSize: 16,
        color: "#8E8E8E",
        marginBottom: 15,
        marginTop: 10,
        fontWeight: "600",
    },
    option: {
        flexDirection: "row",   
        justifyContent: "space-between",

        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
        marginLeft: 10,
        flex: 1,
    },
});
