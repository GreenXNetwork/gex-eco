import { formatter } from './menufuncs';
import { menuData as projectMenuData } from './projectmenu';
import { menuData as dexMenuData } from './exchangemenu';

const menuData = [
    {
        name: 'projects',
        icon: 'projects',
        path: 'projects',
        children: [
            {
                name: 'list',
                path: 'list',
                hideInMenu: true,
                children: projectMenuData,
            },
            {
                name: 'detail',
                path: 'detail',
                hideInMenu: true,
                children: [
                    {
                        name: 'id',
                        path: ':id',
                    },
                ],
            },
        ],
    },
    {
        name: 'portfolio',
        icon: 'portfolio',
        path: 'portfolio',
    },
    {
        name: 'dex',
        icon: 'dex',
        path: 'dex',
        children: dexMenuData,
    },
    {
        name: 'account',
        icon: 'account',
        path: 'account',
        hideInNav: true,
        children: [
            {
                name: 'view',
                path: 'view',
                hideInMenu: true,
            },
            {
                name: 'edit',
                path: 'edit',
                hideInMenu: true,
            },
        ],
    },
];

export const getMenuData = () => formatter(menuData);

export const getNavMenuData = () => formatter(menuData.filter(item => !item.hideInNav));
