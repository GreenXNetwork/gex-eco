import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTachometerAlt,
    faChartBar,
    faHandHoldingUsd,
    faBolt,
    faSolarPanel,
    faBusinessTime,
    faCheckCircle,
    faEllipsisH,
    faHourglassEnd,
} from '@fortawesome/free-solid-svg-icons';
import { formatter } from './menufuncs';

library.add(
    faTachometerAlt,
    faChartBar,
    faHandHoldingUsd,
    faBolt,
    faSolarPanel,
    faBusinessTime,
    faCheckCircle,
    faEllipsisH,
    faHourglassEnd
);

export const menuData = [
    {
        name: 'project-type',
        icon: 'fa-tachometer-alt',
        path: 'project-type',
        children: [
            {
                name: 'all',
                icon: 'file',
                path: 'all',
            },
            {
                name: 'profit-sharing',
                icon: 'fa-chart-bar',
                path: 'profit-sharing',
            },
            {
                name: 'energy-buy-back',
                icon: 'fa-hand-holding-usd',
                path: 'energy-buy-back',
            },
        ],
    },
    {
        name: 'category',
        icon: 'fa-bolt',
        path: 'category',
        children: [
            {
                name: 'all',
                icon: 'file',
                path: 'all',
            },
            {
                name: 'solar',
                icon: 'fa-solar-panel',
                path: 'solar',
            },
            {
                name: 'wind',
                icon: 'my-wind-turbine',
                path: 'wind',
            },
        ],
    },
    {
        name: 'project-timing',
        icon: 'fa-business-time',
        path: 'project-timing',
        children: [
            {
                name: 'all',
                icon: 'file',
                path: 'all',
            },
            {
                name: 'active',
                icon: 'fa-check-circle',
                path: 'active',
            },
            {
                name: 'upcoming',
                icon: 'fa-ellipsis-h',
                path: 'upcoming',
            },
            {
                name: 'ended',
                icon: 'fa-hourglass-end',
                path: 'ended',
            },
        ],
    },
];

export const getMenuData = () => formatter(menuData, '/projects/list/');
