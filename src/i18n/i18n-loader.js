import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    lng: window.navigator.language, // temporary; set your browser language to Spanish to see es
    defaultNS: 'profile',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

i18n.addResources(
  'en',
  'profile',
  {
    'profile.certificates': 'Hi {{name}}!  You have {{count}} certificate.',
    'profile.certificates_plural': 'Hi {{name}}!  You have {{count}} certificates.',
  },
);

i18n.addResources(
  'es-MX',
  'profile',
  {
    'profile.bio.empty': 'Añade una breve biografía',
    'profile.certificates': '¡Hola {{name}}!  Tienes {{count}} certificado.',
    'profile.certificates_plural': '¡Hola {{name}}!  Tienes {{count}} certificados.',
  },
);

export default i18n;
