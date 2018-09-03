import { queryAll } from '../services/project';

export default {
  namespace: 'project',

  state: {
    list: [],
  },

  effects: {
    *fetchAll(_, { call, put }) {
      const response = yield call(queryAll);
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
            projects: payload,
        };
      },
  },
};
