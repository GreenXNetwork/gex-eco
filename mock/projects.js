import { parse } from 'url';
import { stringify } from 'qs';

const projects = {
    'project-type=all': [
        {
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
            thumbnail: '/project/1/thumb_1.png',
        },
        {
            id: 2,
            type: 'profit-sharing',
            name: 'Project Beta - Energy Equity',
            description:
                'The project is in Autralia and is a wind panel system installed on the field.',
            category: 'wind',
            raisedamount: 500000,
            goal: 1250000,
            currency: 'usd',
            progress: 0.4,
            endtime: '2018-10-19 00:00:00 +0600',
            thumbnail: '/project/2/thumb_1.png',
        },
        {
            id: 3,
            type: 'energy-buy-back',
            name: 'Project Gamma - Energy Buy-back',
            description:
                'The project is in Australia and is a wind panel system installed on the hills.',
            category: 'solar',
            raisedamount: 801000,
            goal: 890000,
            currency: 'usd',
            progress: 0.9,
            endtime: '2018-09-19 00:00:00 +0000',
            thumbnail: '/project/3/thumb_1.png',
        },
    ],
    'project-type=profit-sharing': [
        {
            id: 2,
            type: 'profit-sharing',
            name: 'Project Beta - Energy Equity',
            description:
                'The project is in Autralia and is a wind panel system installed on the field.',
            category: 'wind',
            raisedamount: 500000,
            currency: 'usd',
            progress: 0.4,
            endtime: '2018-12-19 00:00:00 +0600',
            thumbnail: '/project/2/thumb_1.png',
        },
    ],
    'project-type=energy-buy-back': [
        {
            id: 1,
            type: 'energy-buy-back',
            name: 'Project Alpha Energy Buy-back',
            description:
                'The project is in South Africa and is a solar panel system installed on the roof of a government building.',
            category: 'solar',
            raisedamount: 500000,
            currency: 'usd',
            progress: 0.8,
            endtime: '2018-11-19 00:00:00 +0700',
            thumbnail: '/project/1/thumb_1.png',
        },
        {
            id: 3,
            type: 'energy-buy-back',
            name: 'Project Gamma - Energy Buy-back',
            description:
                'The project is in Australia and is a wind panel system installed on the hills.',
            category: 'solar',
            raisedamount: 800000,
            currency: 'usd',
            progress: 0.9,
            endtime: '2018-09-19 00:00:00 +0000',
            thumbnail: '/project/3/thumb_1.png',
        },
    ],
};

export function getFakeProjects(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const query = stringify(parse(url, true).query);

    const result = projects[query];

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export default {
    getFakeProjects,
};
