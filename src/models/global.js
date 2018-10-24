import { enquireScreen, unenquireScreen } from 'enquire-js';
import { queryNotices } from '../services/api';

export default {
    namespace: 'global',

    state: {
        collapsed: false,
        mobile: false,
        notices: [],
    },

    effects: {
        *fetchNotices(_, { call, put }) {
            const data = yield call(queryNotices);
            yield put({
                type: 'saveNotices',
                payload: data,
            });
            yield put({
                type: 'user/changeNotifyCount',
                payload: data.length,
            });
        },
        *clearNotices({ payload }, { put, select }) {
            yield put({
                type: 'saveClearedNotices',
                payload,
            });
            const count = yield select(state => state.global.notices.length);
            yield put({
                type: 'user/changeNotifyCount',
                payload: count,
            });
        },
    },

    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
        saveNotices(state, { payload }) {
            return {
                ...state,
                notices: payload,
            };
        },
        saveClearedNotices(state, { payload }) {
            return {
                ...state,
                notices: state.notices.filter(item => item.type !== payload),
            };
        },
        saveMobile(state, { payload }) {
            return {
                ...state,
                mobile: payload,
            };
        },
    },

    subscriptions: {
        setup({ history }) {
            // Subscribe history(url) change, trigger `load` action if pathname is `/`
            return history.listen(({ pathname, search }) => {
                if (typeof window.ga !== 'undefined') {
                    window.ga('send', 'pageview', pathname + search);
                }
            });
        },

        windowSizeChange({ dispatch }) {
            // const handler = () => {
            //     const width = window.innerWidth;
            //     dispatch({ type: 'saveWindowWidth', payload: { width } });
            // };
            // window.addEventListener('resize', handler);

            // const unlistener = () => {
            //     window.removeEventListener('resize', handler);
            // };

            const handler = enquireScreen(mobile => {
                dispatch({ type: 'saveMobile', payload: mobile || false });
            });

            return function unlistener() {
                unenquireScreen(handler);
            };
        },
    },
};
