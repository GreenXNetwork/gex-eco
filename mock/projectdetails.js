import pathToRegexp from 'path-to-regexp';

const details = {
    1: {
        id: 1,
        type: 'energy-buy-back',
        name: 'Project Alpha Energy Buy-back',
        description:
            'The project is in South Africa and is a solar panel system installed on the roof of a government building.',
        category: 'solar',
        raisedamount: 500000,
        goal: 625000,
        currency: 'usd',
        progress: 0.8,
        endtime: '2018-11-19 00:00:00 +0700',
        thumbnail: 'img-1.png',
        investors_number: 3,
        comments_number: 1,
        updates_number: 1,
        background: '/project/1/Bg-Image.png',
        media: [
            '/project/1/5.png',
            '/project/1/2.png',
            '/project/1/3.png',
            '/project/1/4.png',
            '/project/1/1.png',
        ],
        owner: {
            name: 'NESA INVESTMENT HOLDINGS',
            avatar_url: '/projectowner/NESA_Logo.png',
            location: 'South Africa',
        },
    },
};

export function getFakeProjectDetail(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const re = pathToRegexp('/api/projects/detail/:id').exec(url);
    const projectId = re[1];

    const result = details[projectId];

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export default {
    getFakeProjectDetail,
};
