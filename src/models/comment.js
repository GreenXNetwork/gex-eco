import { queryMoreComments, queryMoreReplies, createComment } from '../services/comment';
import { STATUS } from '../common/constants';

function mapReducer(map, elem) {
    const replyData = { ...elem, loading: false, editorStatus: STATUS.ready };
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
        editorStatus: STATUS.ready,
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

        *postComment({ payload }, { call, put, select }) {
            const { projectId, commentId, comment } = payload;
            const { comment: commentState, user: userState } = yield select(state => ({
                comment: state.comment,
                user: state.user,
            }));

            yield put({
                type: 'changeEditorState',
                payload: { commentId, status: STATUS.sending },
            });

            const ok = yield call(
                createComment,
                projectId,
                commentId,
                userState.currentUser.id,
                comment
            );

            if (ok) {
                if (commentId) {
                    const response = yield call(
                        queryMoreReplies,
                        projectId,
                        commentId,
                        0,
                        commentState.loadSize
                    );

                    yield put({
                        type: 'saveCommentReplies',
                        payload: {
                            commentId,
                            totalReplies: response.total,
                            replies: response.records,
                        },
                    });
                }
                yield put({
                    type: 'changeEditorState',
                    payload: { commentId, status: STATUS.completed },
                });
            }
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

        changeEditorState(state, { payload }) {
            const { commentId, status } = payload;
            if (commentId) {
                const comment = state.data.get(commentId);
                comment.editorStatus = status;
                return {
                    ...state,
                };
            }

            return {
                ...state,
                editorStatus: status,
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
