import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../../locales/en.json';

const appLocale = {
  messages: {
    ...zhMessages,
  },
  antd: null,
  locale: 'zh-Hans-CN',
  lang: 'zh',
  data: appLocaleData,
};

export default appLocale;