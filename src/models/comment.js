import { queryMoreComments } from '../services/comment';

export default {
    namespace: 'comment',

    state: {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        total: 0,
        loadSize: 10,
    },

    effects: {
        *fetchMoreComments({ payload }, { call, put, select }) {
            const { projectId } = payload;
            const commentState = yield select(state => state.comment);

            const response = yield call(
                queryMoreComments,
                projectId,
                commentState.list.length,
                commentState.loadSize
            );

            const comments = [...commentState.list, ...response.records];

            yield put({
                type: 'saveComments',
                payload: {
                    total: response.total,
                    list: comments,
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
                list: payload.list,
            };
        },
    },
};
