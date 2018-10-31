import { library } from '@fortawesome/fontawesome-svg-core';
import { faWallet, faExchangeAlt, faHistory } from '@fortawesome/free-solid-svg-icons';
import { formatter } from './menufuncs';

library.add(faWallet, faExchangeAlt, faHistory);

export const menuData = [
    {
        name: 'exchange',
        icon: 'fa-exchange-alt',
        path: 'exchange',
    },
    {
        name: 'wallet',
        icon: 'fa-wallet',
        path: 'wallet',
    },
    {
        name: 'history',
        icon: 'fa-history',
        path: 'txhistory',
    },
];

export const getMenuData = () => formatter(menuData, '/dex/');
