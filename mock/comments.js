import pathToRegexp from 'path-to-regexp';
import { parse } from 'qs';
import { users } from './users';

let TOTAL = 5;

const PROJECT_COMMENTS = {
    1: [
        {
            id: 1,
            parent_id: null,
            comment: 'I have some questions.',
            investor_id: 2,
            investor_name: 'Investor1',
            avatar_url: '/default-avatar.png',
            created_time: 1540452292702,
            is_campaigner: false,
            reply_number: 2,
            replies: [],
        },
        {
            id: 2,
            comment: 'Great work!',
            investor_id: 3,
            investor_name: 'Pandar',
            avatar_url: 'default-avatar.png',
            created_time: 1540452322702,
            is_campaigner: false,
            reply_number: 1,
            replies: [],
        },
    ],
};

const REPLIES = {
    1: [
        {
            id: 3,
            parent_id: 1,
            investor_id: 1,
            investor_name: 'Administrator',
            avatar_url: 'default-avatar.png',
            comment: 'Please do',
            created_time: 1540452298702,
            is_campaigner: true,
            reply_number: 0,
            replies: [],
        },
        {
            id: 4,
            parent_id: 1,
            investor_id: 3,
            investor_name: 'Investor1',
            avatar_url: 'default-avatar.png',
            comment: 'When do this project start ?',
            created_time: 1540452498702,
            is_campaigner: false,
            reply_number: 0,
            replies: [],
        },
    ],
    2: [
        {
            id: 5,
            parent_id: 2,
            investor_id: 1,
            investor_name: 'Administrator',
            avatar_url: 'default-avatar.png',
            comment: 'Thank you',
            created_time: 1540452398702,
            is_campaigner: true,
            reply_number: 0,
            replies: [],
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

    const comments = PROJECT_COMMENTS[projectId] || [];

    const result = {
        total: comments.length,
        records: [],
    };

    const { skip, size } = queryParams;

    if (skip < comments.length) {
        result.records = comments.slice(skip, skip + size);
    }

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export function getFakeCommentReplies(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const re = pathToRegexp('/api/projects/:project_id/comments/:comment_id/replies:query?').exec(
        url
    );

    // const projectId = re[1];
    const commentId = re[2];
    const queryParams = parse(re[3], { ignoreQueryPrefix: true });

    const replies = REPLIES[commentId] || [];

    const result = {
        total: replies.length,
        records: [],
    };

    const { skip, size } = queryParams;

    if (skip < replies.length) {
        result.records = replies.slice(skip, skip + size);
    }

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export function postFakeComment(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const re = pathToRegexp('/api/projects/:project_id/comments').exec(url);

    const projectId = re[1];

    const { body: data } = req;

    // console.log(JSON.stringify(data));

    const user = users[data.user_id];
    if (data.parent_id) {
        REPLIES[data.parent_id].push({
            id: TOTAL,
            parent_id: data.parent_id,
            investor_id: data.user_id,
            investor_name: user.name,
            avatar_url: user.avatar_url,
            comment: data.comment,
            created_time: Date.now(),
            is_campaigner: user.name === 'Administrator',
            reply_number: 0,
            replies: [],
        });
        TOTAL += 1;
    } else {
        PROJECT_COMMENTS[projectId].push({
            id: TOTAL,
            parent_id: data.parent_id,
            investor_id: data.user_id,
            investor_name: user.name,
            avatar_url: user.avatar_url,
            comment: data.comment,
            created_time: Date.now(),
            is_campaigner: user.name === 'Administrator',
            reply_number: 0,
            replies: [],
        });
    }

    if (res && res.json) {
        res.json(true);
    } else {
        return true;
    }
}

export default {
    getFakeComments,
    getFakeCommentReplies,
    postFakeComment,
};
