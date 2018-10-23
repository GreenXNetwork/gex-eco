import { isUrl } from '../utils/utils';
import { menuData as projectMenuData } from './projectmenu';

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
        name: 'exchange',
        icon: 'exchange',
        path: 'exchange',
    },
    {
        name: 'wallet',
        icon: 'wallet',
        path: 'wallet',
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

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(
                item.children,
                `${parentPath}${item.path}/`,
                item.authority
            );
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);

export const getNavMenuData = () => formatter(menuData.filter(item => !item.hideInNav));
