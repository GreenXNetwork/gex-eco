import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { accountLogin } from '../services/api';
import { setAuthority, getAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';
import { setAccessToken, getAccessToken } from '../utils/auth';

function checkLoginStatus() {
    const accessToken = getAccessToken();
    const authority = getAuthority();

    if (accessToken && authority && authority !== 'guest') {
        return 'ok';
    }

    return 'no';
}

export default {
    namespace: 'login',

    state: {
        status: checkLoginStatus(),
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(accountLogin, payload);

            // Login successfully
            if (response && response.status === 'ok') {
                yield put({
                    type: 'changeLoginStatus',
                    payload: response,
                });

                reloadAuthorized();
            }
        },
        *loginRedirect(_, { put }) {
            const urlParams = new URL(window.location.href);
            const params = getPageQuery();
            let { redirect } = params;
            if (redirect) {
                const redirectUrlParams = new URL(redirect);
                if (redirectUrlParams.origin === urlParams.origin) {
                    redirect = redirect.substr(urlParams.origin.length);
                    if (redirect.startsWith('/#')) {
                        redirect = redirect.substr(2);
                    }
                } else {
                    window.location.href = redirect;
                    return;
                }
            }
            yield put(routerRedux.replace(redirect || '/'));
        },
        *logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: 'no',
                    currentAuthority: 'guest',
                    access_token: null,
                },
            });
            reloadAuthorized();
            yield put(
                routerRedux.push({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                })
            );
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            if (payload) {
                setAuthority(payload.currentAuthority);
                setAccessToken(payload.access_token);
            }
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
    },
};
