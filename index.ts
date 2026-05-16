import { registerRootComponent } from 'expo';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from './src/androidWidgets/widgetTaskHandler';
import App from './src/app/App';

registerWidgetTaskHandler(widgetTaskHandler);
registerRootComponent(App);