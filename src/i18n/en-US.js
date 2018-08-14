import antdEn from 'antd/lib/locale-provider/en_US';
import appLocaleData from 'react-intl/locale-data/en';
import enMessages from '../../locales/zh.json';

const appLocale = {
  messages: {
    ...enMessages,
  },
  antd: antdEn,
  locale: 'en-US',
  lang: 'en',
  data: appLocaleData,
};

export default appLocale;