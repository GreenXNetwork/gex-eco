import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from "./configureStore";
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en';
import vi from 'react-intl/locale-data/vi';
import { Provider } from 'react-redux';
import { setLocale } from './services/locale/localeAction';

addLocaleData(en);
addLocaleData(vi);

const store = configureStore();

if (!localStorage.platformLang) {
    store.dispatch(setLocale(localStorage.platformLang));
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
