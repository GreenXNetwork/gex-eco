import pathToRegexp from 'path-to-regexp';
import { parse } from 'qs';

const PROJECT_UPDATES = {
    1: [
        {
            post_id: 1,
            avatar_image_url: '/default-avatar.png',
            owner_id: 1,
            owner_name: 'Administrator',
            created_time: 1540449004009,
            show_status: 'public',
            html:
                '<p>Some more info about this project:</p><ul><li><span style="font-size: 7pt; font-family: Symbol;">&nbsp;</span>Location: South Africa</li><li>Investment requirements: $1,000,000</li><li>Project Size: 1.2 MWp</li><li>Expected Returns: 26%</li><li>Duration: 20 years</li><li>Certificate Name: GXAlpha</li><li>Certificate Price: $1&nbsp;&nbsp;&nbsp;</li></ul>',
        },
    ],
};

export function getFakeUpdates(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const re = pathToRegexp('/api/projects/:project_id/updates:query?').exec(url);

    const projectId = re[1];
    const queryParams = parse(re[2], { ignoreQueryPrefix: true });

    const updates = PROJECT_UPDATES[projectId] || [];

    const result = {
        total: updates.length,
        records: [],
    };

    const { skip, size } = queryParams;

    if (skip < updates.length) {
        result.records = updates.slice(skip, skip + size);
    }

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export default {
    getFakeUpdates,
};
