import { queryInvestorsByProject } from '../services/investor';

export default {
    namespace: 'investor',

    state: {
        data: [],
        list: [],
        total: 0,
        loadSize: 2,
    },

    effects: {
        *fetchInvestors({ payload }, { call, put, select }) {
            const { projectId } = payload;
            const investorState = yield select(state => state.investor);

            const response = yield call(
                queryInvestorsByProject,
                projectId,
                0,
                investorState.loadSize
            );

            const investors = [...response.records];

            yield put({
                type: 'saveInvestors',
                payload: {
                    total: response.total,
                    list: investors,
                },
            });
        },

        *fetchMoreInvestors({ payload }, { call, put, select }) {
            const { projectId } = payload;
            const investorState = yield select(state => state.investor);

            const response = yield call(
                queryInvestorsByProject,
                projectId,
                investorState.list.length,
                investorState.loadSize
            );

            const investors = [...investorState.list, ...response.records];

            yield put({
                type: 'saveInvestors',
                payload: {
                    total: response.total,
                    list: investors,
                },
            });
        },
    },

    reducers: {
        saveInvestors(state, { payload }) {
            return {
                ...state,
                total: payload.total,
                list: payload.list,
            };
        },
    },
};
