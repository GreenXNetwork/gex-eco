import { queryPortfolio } from '../services/portfolio';

export default {
    namespace: 'portfolio',

    state: {},

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(queryPortfolio);
            yield put({
                type: 'show',
                payload: response,
            });
        },
    },

    reducers: {
        show(state, { payload }) {
            return {
                ...state,
                current: payload,
            };
        },
    },
};
