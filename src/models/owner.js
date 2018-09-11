import { queryOwner } from '../services/owner';

export default {
    namespace: 'owner',

    state: {},

    effects: {
        *fetchOwner({ ownerId }, { call, put }) {
            const response = yield call(queryOwner, ownerId);
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
