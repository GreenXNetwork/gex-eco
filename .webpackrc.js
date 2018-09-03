const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: 
      [
        'dva-hmr',
        [
          'react-intl',
          {
            'messagesDir': './i18n-messages',
          },
        ]
      ],
    },
  },
  externals: {
    '@antv/data-set': 'DataSet',
    rollbar: 'rollbar',
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: false,
  proxy: {
    "/api/user": {
      "target": "http://localhost:8080/",
    },
    "/api/login": {
      "target": "http://localhost:8080/",
    },
    "/api/logout": {
      "target": "http://localhost:8080/",
    },
    "/api/register": {
      "target": "http://localhost:8080/",
    },
  }
};
