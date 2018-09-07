import { routerRedux } from 'dva/router';
import { queryProjects } from '../services/project';
import { queryInvestorsByProject } from '../services/investor';

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
        *fetchProjectInvestors({ projectId }, { call, put }) {
            const response = yield call(queryInvestorsByProject, projectId);
            yield put({
                type: 'showInvestors',
                payload: response,
            });
        },
    },

    reducers: {
        show(state, { payload }) {
            return {
                ...state,
                projects: payload,
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
