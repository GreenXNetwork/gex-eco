import { query } from '../services/profiletrans';

export default {
    namespace: 'profiletrans',

    state: {},

    effects: {
        *fetch({ userId, lang }, { call, put }) {
            const response = yield call(query, userId, lang);
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
                ...payload,
            };
        },
    },
};
