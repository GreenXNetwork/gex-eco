import { formatter } from './menufuncs';

export const menuData = [
    {
        name: 'project-type',
        icon: 'filter',
        path: 'project-type',
        children: [
            {
                name: 'all',
                icon: 'file',
                path: 'all',
            },
            {
                name: 'profit-sharing',
                icon: 'file',
                path: 'profit-sharing',
            },
            {
                name: 'energy-buy-back',
                icon: 'file',
                path: 'energy-buy-back',
            },
        ],
    },
    {
        name: 'category',
        icon: 'filter',
        path: 'category',
        children: [
            {
                name: 'all',
                icon: 'file',
                path: 'all',
            },
            {
                name: 'solar',
                icon: 'file',
                path: 'solar',
            },
            {
                name: 'wind',
                icon: 'file',
                path: 'wind',
            },
        ],
    },
    {
        name: 'project-timing',
        icon: 'filter',
        path: 'project-timing',
        children: [
            {
                name: 'all',
                icon: 'file',
                path: 'all',
            },
            {
                name: 'active',
                icon: 'file',
                path: 'active',
            },
            {
                name: 'upcoming',
                icon: 'file',
                path: 'upcoming',
            },
            {
                name: 'ended',
                icon: 'file',
                path: 'ended',
            },
        ],
    },
];

export const getMenuData = () => formatter(menuData, '/projects/list/');
