import { queryProjectDetail } from '../services/project';

export default {
    namespace: 'projectdetail',

    state: {},

    effects: {
        *fetchProjectDetail({ payload }, { call, put }) {
            const { projectId } = payload;
            const reponse = yield call(queryProjectDetail, projectId);
            yield put({
                type: 'showProjectDetail',
                payload: reponse,
            });

            yield put({
                type: 'comment/fetchComments',
                payload: { projectId },
            });

            yield put({
                type: 'investor/fetchInvestors',
                payload: { projectId },
            });

            yield put({
                type: 'update/fetchUpdates',
                payload: { projectId },
            });
        },
    },

    reducers: {
        showProjectDetail(state, { payload }) {
            return {
                ...state,
                detail: payload,
            };
        },
    },
};
