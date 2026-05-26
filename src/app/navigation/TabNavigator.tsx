import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useColorScheme, View, Pressable, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useTaskDialogStore } from '@/shared/ui/TaskDialogControl';
import { useRef } from 'react';
import Main from '@/pages/Main/Main';
import AchievementsPage from '@/pages/Achievements/Achievements';


const Tab = createMaterialTopTabNavigator();

const TABS = [
  { name: 'Home',  icon: 'home'       as const, iconOutline: 'home-outline'       as const },
  { name: 'Stats', icon: 'trophy'     as const, iconOutline: 'trophy-outline'     as const },
];

function BottomBar({ state, navigation }: MaterialTopTabBarProps) {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const openTaskDialog = useTaskDialogStore((s) => s.open);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      stiffness: 300,
      damping: 10,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      stiffness: 300,
      damping: 10,
    }).start();
  };

  const bgColor      = isDark ? '#1E1E1E' : '#FFFFFF';
  const activeColor  = isDark ? '#7C3AED' : '#7C3AED';
  const inactiveColor = isDark ? '#6B7280' : '#9CA3AF';

  return (
    <View style={[styles.bar, { backgroundColor: bgColor, paddingBottom: insets.bottom || 12 }]}>
      {(() => {
        const homeRoute = state.routes[0];
        const statsRoute = state.routes[1];
        const homeTab = TABS[0];
        const statsTab = TABS[1];
        const homeFocused = state.index === 0;
        const statsFocused = state.index === 1;

        return (
          <>
            <Pressable
              key={homeRoute.key}
              onPress={() => navigation.navigate(homeRoute.name)}
              style={styles.item}
            >
              <Ionicons
                name={homeFocused ? homeTab.icon : homeTab.iconOutline}
                size={24}
                color={homeFocused ? activeColor : inactiveColor}
                style={{ transform: [{ scale: homeFocused ? 1.15 : 1 }] }}
              />
            </Pressable>

            <Pressable
              onPress={openTaskDialog}
              onPressIn={animateIn}
              onPressOut={animateOut}
              style={styles.centerBtn}
            >
              <Animated.View style={[styles.centerBtnInner, { backgroundColor: activeColor, transform: [{ scale: scaleAnim }] }]}>
                <Ionicons name="add" size={28} color="#FFFFFF" />
              </Animated.View>
            </Pressable>

            <Pressable
              key={statsRoute.key}
              onPress={() => navigation.navigate(statsRoute.name)}
              style={styles.item}
            >
              <Ionicons
                name={statsFocused ? statsTab.icon : statsTab.iconOutline}
                size={24}
                color={statsFocused ? activeColor : inactiveColor}
                style={{ transform: [{ scale: statsFocused ? 1.15 : 1 }] }}
              />
            </Pressable>
          </>
        );
      })()}
    </View>
  );
}

export function TabNavigator() {
  const isDark = useColorScheme() === 'dark';
  const bgColor = isDark ? '#121212' : '#F4F4F8';

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomBar {...props} />}
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        tabBarStyle: { height: 0 },
        tabBarIndicatorStyle: { height: 0 },
      }}
    >
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Stats" component={AchievementsPage} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  centerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginTop: -2,
  },
  centerBtnInner: {
    width: 52,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});