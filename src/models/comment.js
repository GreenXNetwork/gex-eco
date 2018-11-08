import { queryMoreComments, queryMoreReplies } from '../services/comment';

function mapReducer(map, elem) {
    const replyData = { ...elem, loading: false };
    map.set(elem.id, replyData);
    return map;
}

export default {
    namespace: 'comment',

    state: {
        initLoading: true,
        loading: false,
        data: new Map(),
        total: 0,
        loadSize: 10,
    },

    effects: {
        *fetchComments({ payload }, { call, put, select }) {
            const { projectId } = payload;
            const commentState = yield select(state => state.comment);

            const response = yield call(queryMoreComments, projectId, 0, commentState.loadSize);

            const comments = response.records.reduce(mapReducer, new Map());

            yield put({
                type: 'saveComments',
                payload: {
                    total: response.total,
                    data: comments,
                },
            });
        },

        *fetchMoreComments({ payload }, { call, put, select }) {
            const { projectId } = payload;
            const commentState = yield select(state => state.comment);

            const response = yield call(
                queryMoreComments,
                projectId,
                commentState.data.size,
                commentState.loadSize
            );

            const newComments = response.records.reduce(mapReducer, new Map());

            const comments = new Map([...commentState.data, ...newComments]);

            yield put({
                type: 'saveComments',
                payload: {
                    total: response.total,
                    data: comments,
                },
            });
        },

        *fetchMoreReplies({ payload }, { call, put, select }) {
            const { projectId, commentId } = payload;
            const commentState = yield select(state => state.comment);

            const comment = commentState.data.get(commentId);

            const response = yield call(
                queryMoreReplies,
                projectId,
                commentId,
                comment.replies.length,
                commentState.loadSize
            );

            const replies = [...comment.replies, ...response.records];

            yield put({
                type: 'saveCommentReplies',
                payload: {
                    commentId,
                    totalReplies: response.total,
                    replies,
                },
            });
        },
    },

    reducers: {
        saveComments(state, { payload }) {
            return {
                ...state,
                loading: false,
                total: payload.total,
                data: payload.data,
            };
        },

        saveCommentReplies(state, { payload }) {
            const comment = state.data.get(payload.commentId);
            comment.reply_number = payload.totalReplies;
            comment.replies = payload.replies;
            return {
                ...state,
            };
        },
    },
};
