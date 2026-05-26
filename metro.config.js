const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  buffer: require.resolve('buffer'),
};

config.transformer.transformIgnorePatterns = [
  'node_modules/(?!(expo|expo-modules-core|@expo|@expo-google-fonts|react-native|@react-native|react-native-svg|react-native-paper|react-native-reanimated|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-native-android-widget|react-native-drax|react-native-circular-progress|react-native-infinite-wheel-picker|react-native-pager-view|react-native-tab-view|i18n-js|zustand)/)',
];

module.exports = config;