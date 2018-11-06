import pathToRegexp from 'path-to-regexp';
import { parse } from 'qs';

const PROJECT_COMMENTS = {
    1: [
        {
            id: 1,
            comment: 'I have some questions bla bla',
            investor_id: 1,
            investor_name: 'Rehkj',
            avatar_url: 'https://public/asdfasdf.png',
            created_time: 1540452292702,
            is_campaigner: false,
            replies: [
                {
                    comment_id: 2,
                    investor_id: 3,
                    investor_name: 'IAmOwner',
                    avatar_url: '',
                    comment: '',
                    created_time: 1540452298702,
                    is_campaigner: true,
                },
            ],
        },
        {
            id: 2,
            comment: 'Great work!',
            investor_id: 2,
            investor_name: 'Banda',
            avatar_url: null,
            created_time: 1540452322702,
            is_campaigner: false,
            replies: [
                {
                    comment_id: 2,
                    investor_id: 3,
                    investor_name: 'IAmOwner',
                    avatar_url: '',
                    comment: '',
                    created_time: 1540452398702,
                    is_campaigner: true,
                },
            ],
        },
    ],
};

export function getFakeComments(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const re = pathToRegexp('/api/projects/:project_id/comments:query?').exec(url);

    const projectId = re[1];
    const queryParams = parse(re[2], { ignoreQueryPrefix: true });

    const comments = PROJECT_COMMENTS[projectId];

    let result = {
        total: 1,
        records: comments,
    };

    if (queryParams.skip > 0) {
        result = {
            total: 1,
            records: [],
        };
    }

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export default {
    getFakeComments,
};
