import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './en';
import ru from './ru';

const i18n = new I18n({
  en,
  ru,
});

const locale = Localization.getLocales()[0]?.languageCode || 'en';

i18n.locale = locale;
i18n.enableFallback = true;

export default i18n;