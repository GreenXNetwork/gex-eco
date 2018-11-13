import { queryMoreUpdates } from '../services/update';

export default {
    namespace: 'update',

    state: {
        initLoading: true,
        loading: false,
        list: [],
        total: 0,
        loadSize: 10,
    },

    effects: {
        *fetchUpdates({ payload }, { call, put, select }) {
            const { projectId } = payload;
            const updateState = yield select(state => state.update);

            const response = yield call(queryMoreUpdates, projectId, 0, updateState.loadSize);

            const updates = [...updateState.list, ...response.records];

            yield put({
                type: 'showUpdates',
                payload: {
                    total: response.total,
                    list: updates,
                },
            });
        },

        *fetchMoreUpdates({ payload }, { call, put, select }) {
            const { projectId } = payload;
            const updateState = yield select(state => state.update);

            const response = yield call(
                queryMoreUpdates,
                projectId,
                updateState.list.length,
                updateState.loadSize
            );

            const updates = [...updateState.list, ...response.records];

            yield put({
                type: 'showUpdates',
                payload: {
                    total: response.total,
                    list: updates,
                },
            });
        },
    },

    reducers: {
        showUpdates(state, { payload }) {
            return {
                ...state,
                loading: false,
                total: payload.total,
                list: payload.list,
            };
        },
    },
};
