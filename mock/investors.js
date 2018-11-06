import pathToRegexp from 'path-to-regexp';
import { parse } from 'qs';

const PROJECT_INVESTORS = {
    1: [
        {
            investor_name: 'Tony Ng',
            investor_profile_url: '/individuals/1',
            time_ago: 42,
            investor_image_url:
                'https://g0.iggcdn.com/assets/individuals/missing/cubepeep-d219149a2e3e1518115ddf3bdc699aa13c1358ef8a0923546a1eb798a8be790a.png',
            display_amount: '200',
            display_amount_currency: 'GEX',
        },
        {
            investor_name: 'William Ng',
            investor_profile_url: '/individuals/2',
            time_ago: 1,
            investor_image_url:
                'https://g0.iggcdn.com/assets/individuals/missing/cubepeep-d219149a2e3e1518115ddf3bdc699aa13c1358ef8a0923546a1eb798a8be790a.png',
            display_amount: '1900',
            display_amount_currency: 'GEX',
        },
        {
            investor_name: 'Husky',
            investor_profile_url: '/individuals/3',
            time_ago: 18,
            investor_image_url:
                'https://g0.iggcdn.com/assets/individuals/missing/cubepeep-d219149a2e3e1518115ddf3bdc699aa13c1358ef8a0923546a1eb798a8be790a.png',
            display_amount: '10',
            display_amount_currency: 'GEX',
        },
    ],
    2: [],
    3: [],
};

export function getFakeProjectInvestors(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const re = pathToRegexp('/api/projects/:project_id/investors:query?').exec(url);

    const projectId = re[1];
    const queryParams = parse(re[2], { ignoreQueryPrefix: true });

    const investors = PROJECT_INVESTORS[projectId];

    const result = {
        total: investors.length,
        records: [],
    };

    const { skip, size } = queryParams;

    if (skip < investors.length) {
        result.records = investors.slice(skip, skip + size);
    }

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export default {
    getFakeProjectInvestors,
};
