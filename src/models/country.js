import { queryList } from '../services/country';
import { getRemainingMinutes } from '../utils/time';

export default {
    namespace: 'country',

    state: {
        list: [],
        timestamp: 0,
    },

    effects: {
        *fetchAll(_, { select, call, put }) {
            const timestamp = yield select(state => state.country.timestamp);
            const minutesDiff = getRemainingMinutes(timestamp);
            if (minutesDiff > 5) {
                const response = yield call(queryList);
                yield put({
                    type: 'save',
                    payload: {
                        list: response,
                        timestamp: Date.now(),
                    },
                });
            } else {
                const list = yield select(state => state.country.list);
                yield put({
                    type: 'save',
                    payload: { list },
                });
            }
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                list: action.payload.list,
                timestamp: action.payload.timestamp,
            };
        },
    },
};
