import { routerRedux } from 'dva/router';
import { queryProjects } from '../services/project';

export default {
    namespace: 'project',

    state: {
        list: [],
    },

    effects: {
        *fetchProjects({ params }, { call, put }) {
            const response = yield call(queryProjects, params);
            yield put({
                type: 'show',
                payload: response,
            });
        },
        *showDetail({ id }, { put }) {
            yield put(
                routerRedux.push({
                    pathname: `/projects/detail/${id}`,
                })
            );
        },
    },

    reducers: {
        show(state, { payload }) {
            return {
                ...state,
                projects: payload,
            };
        },
    },
};
