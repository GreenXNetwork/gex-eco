import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'projects',
    icon: 'projects',
    path: 'projects',
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
    name: 'profile',
    icon: 'profile',
    path: 'profile',
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
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
