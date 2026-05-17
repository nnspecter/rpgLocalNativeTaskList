import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useColorScheme, View, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import Main from '@/pages/Main/Main';
import Achivments from '@/pages/Achivments/Achivments';

const Tab = createMaterialTopTabNavigator();

const TABS = [
  { name: 'Home',  icon: 'home'   as const, iconOutline: 'home-outline'   as const },
  { name: 'Stats', icon: 'trophy' as const, iconOutline: 'trophy-outline' as const },
];

function BottomBar({ state, navigation }: MaterialTopTabBarProps) {
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();

  const bgColor      = isDark ? '#1E1E1E' : '#FFFFFF';
  const activeColor  = isDark ? '#A78BFA' : '#7C3AED';
  const inactiveColor = isDark ? '#6B7280' : '#9CA3AF';

  return (
    <View style={[styles.bar, { backgroundColor: bgColor, paddingBottom: insets.bottom || 12 }]}>
      {state.routes.map((route, index) => {
        const tab = TABS[index];
        const focused = state.index === index;
        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.item}
          >
            <Ionicons
              name={focused ? tab.icon : tab.iconOutline}
              size={24}
              color={focused ? activeColor : inactiveColor}
              style={{ transform: [{ scale: focused ? 1.15 : 1 }] }}
            />
          </Pressable>
        );
      })}
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
        tabBarStyle: { height: 0 },       // прячем родной топ-бар
        tabBarIndicatorStyle: { height: 0 },
      }}
    >
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Stats" component={Achivments} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    elevation: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
});