import { queryExBalances, queryExCurrencies, queryExPairs, queryExGas } from '../services/exchange';

export default {
    namespace: 'exchange',

    state: {},

    effects: {
        *fetchBalances(_, { call, put }) {
            const response = yield call(queryExBalances);
            yield put({
                type: 'showBalances',
                payload: response,
            });
        },
        *fetchPairs(_, { call, put }) {
            const response = yield call(queryExPairs);
            yield put({
                type: 'showPairs',
                payload: response,
            });
        },
        *fetchGas(_, { call, put }) {
            const response = yield call(queryExGas);
            yield put({
                type: 'showGas',
                payload: response,
            });
        },
        *fetchCurrencies(_, { call, put }) {
            const response = yield call(queryExCurrencies);
            yield put({
                type: 'showCurrencies',
                payload: response,
            });
        },
    },

    reducers: {
        showGas(state, { payload }) {
            return {
                ...state,
                gasprice: payload,
            };
        },
        showCurrencies(state, { payload }) {
            return {
                ...state,
                currencies: payload,
            };
        },
        showPairs(state, { payload }) {
            return {
                ...state,
                pairs: payload,
            };
        },
        showBalances(state, { payload }) {
            return {
                ...state,
                balances: payload,
            };
        },
    },
};
