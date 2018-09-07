import pathToRegexp from 'path-to-regexp';

const projectInvestors = {
    '1': {
        list: [
            {
                investor_name: 'Tony Ng',
                investor_profile_url: '/individuals/1',
                time_ago: 42,
                investor_image_url:
                    'https://g0.iggcdn.com/assets/individuals/missing/cubepeep-d219149a2e3e1518115ddf3bdc699aa13c1358ef8a0923546a1eb798a8be790a.png',
                display_amount: '$49',
                display_amount_currency: 'USD',
            },
            {
                investor_name: 'William Ng',
                investor_profile_url: '/individuals/2',
                time_ago: 1,
                investor_image_url:
                    'https://g0.iggcdn.com/assets/individuals/missing/cubepeep-d219149a2e3e1518115ddf3bdc699aa13c1358ef8a0923546a1eb798a8be790a.png',
                display_amount: '$49',
                display_amount_currency: 'USD',
            },
            {
                investor_name: 'Husky',
                investor_profile_url: '/individuals/3',
                time_ago: 18,
                investor_image_url:
                    'https://g0.iggcdn.com/assets/individuals/missing/cubepeep-d219149a2e3e1518115ddf3bdc699aa13c1358ef8a0923546a1eb798a8be790a.png',
                display_amount: '$49',
                display_amount_currency: 'USD',
            },
        ],
        count: 3,
        pagination: {
            previous: null,
            next: 2,
            current: 1,
            per_page: 10,
            count: 3,
            pages: 1,
        },
    },
};

export function getFakeProjectInvestors(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const re = pathToRegexp('/api/projects/:id/investors').exec(url);
    const projectId = re[1];

    const result = projectInvestors[projectId];

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export default {
    getFakeProjectInvestors,
};
