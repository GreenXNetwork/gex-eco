import { queryProjectDetail } from '../services/project';
import { queryInvestorsByProject } from '../services/investor';

export default {
    namespace: 'projectdetail',

    state: {},

    effects: {
        *fetchProjectDetail({ projectId }, { call, put }) {
            const reponse = yield call(queryProjectDetail, projectId);
            yield put({
                type: 'showProjectDetail',
                payload: reponse,
            });
        },
        *fetchProjectInvestors({ projectId }, { call, put }) {
            const response = yield call(queryInvestorsByProject, projectId);
            yield put({
                type: 'showInvestors',
                payload: response,
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
        showInvestors(state, { payload }) {
            return {
                ...state,
                investors: payload,
            };
        },
    },
};
