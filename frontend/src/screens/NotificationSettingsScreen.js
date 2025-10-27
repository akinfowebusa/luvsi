import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"; 

const COLORS = {
  background: '#FAF8F4',
  text: '#000000',
  description: '#666666',
  divider: '#E0E0E0',
  activeSwitchDark: '#000000',
  activeSwitchYellow: '#F2C94C',
};

const NotificationRow = ({ title, description, isEnabled, onToggle, customColor }) => {
  const thumbColor = isEnabled && customColor ? customColor : isEnabled ? COLORS.text : '#f4f3f4';
  return (
    <View style={styles.rowContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {description && <Text style={styles.descriptionText}>{description}</Text>}
      </View>
      <Switch
        trackColor={{ false: '#EAEAEA', true: customColor || COLORS.activeSwitchDark }}
        thumbColor={thumbColor}
        ios_backgroundColor="#EAEAEA"
        onValueChange={onToggle}
        value={isEnabled}
        style={styles.switchStyle}
      />
    </View>
  );
};

const NotificationSettingsScreen = ({ navigation }) => {
  const [messagesEnabled, setMessagesEnabled] = useState(true);
  const [crushesEnabled, setCrushesEnabled] = useState(true);
  const [superCrushesEnabled, setSuperCrushesEnabled] = useState(true);
  const [likesEnabled, setLikesEnabled] = useState(true);
  const [dailyRecapEnabled, setDailyRecapEnabled] = useState(true);
  const [otherNotificationsEnabled, setOtherNotificationsEnabled] = useState(true);

  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Back pressed');
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Notifications</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        
        <View style={styles.sectionMargin}>
          <Text style={styles.sectionHeaderTitle}>New activity</Text>
          <Text style={styles.sectionHeaderDescription}>
            {"Don't miss a thing! Manage your notification settings."}
          </Text>
        </View>

        <NotificationRow
          title="Messages"
          description="Notify when you receive a message"
          isEnabled={messagesEnabled}
          onToggle={setMessagesEnabled}
        />
        <NotificationRow
          title="Crushes"
          description="Notify when someone crushes on you"
          isEnabled={crushesEnabled}
          onToggle={setCrushesEnabled}
        />
        <NotificationRow
          title="SuperCrushes"
          description="Notify for super crushes"
          isEnabled={superCrushesEnabled}
          onToggle={setSuperCrushesEnabled}
        />
        <NotificationRow
          title="Likes"
          description="Notify when someone likes you"
          isEnabled={likesEnabled}
          onToggle={setLikesEnabled}
          customColor={COLORS.activeSwitchYellow}
        />


        <View style={styles.sectionMargin}>
          <Text style={styles.sectionHeaderDescription}>
            {"Enjoy a daily summary of your activity on Luvsi."}
          </Text>
          <NotificationRow
            title="Daily recap"
            isEnabled={dailyRecapEnabled}
            onToggle={setDailyRecapEnabled}
          />
        </View>

  
        <View style={styles.sectionMargin}>
          <Text style={styles.sectionHeaderDescription}>
            {"Keep up to date with our promotions, partnerships and latest news."}
          </Text>
          <NotificationRow
            title="Other notifications"
            isEnabled={otherNotificationsEnabled}
            onToggle={setOtherNotificationsEnabled}
          />
        </View>

        <View style={{ height: 50 }} />

      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.divider,
    justifyContent: 'space-between',
  },
  backButton: { padding: 5 },
  screenTitle: { fontSize: 20, fontWeight: '600', color: COLORS.text },

  sectionMargin: { marginTop: 25, marginBottom: 10 },
  sectionHeaderTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 5 },
  sectionHeaderDescription: { fontSize: 14, color: COLORS.description, marginBottom: 10, lineHeight: 20 },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.divider,
  },
  textContainer: { flex: 1 },
  titleText: { fontSize: 16, color: COLORS.text, fontWeight: '500' },
  descriptionText: { fontSize: 14, color: COLORS.description, marginTop: 2, lineHeight: 20 },
  switchStyle: { transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] },
});

export default NotificationSettingsScreen;
