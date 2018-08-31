import fetch from 'dva/fetch';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import store from '../index';
import { getAccessToken, setAccessToken } from './auth';

const codeMessage = {
    200: 'Server returned the data successfully.',
    201: 'Updating data is successful.',
    202: 'A request has been pused to the background queue (async task).',
    204: 'Deleting data successfully.',
    400: 'The request was sent with an error. The server did not perform any operations to create or modify data.',
    401: 'The user does not have permission (token, username, password is incorrect).',
    403: 'User is authorized, but access is forbidden.',
    404: 'The request was made to a record that does not exist.',
    406: 'The format of the request is not available.',
    410: 'The requested resource is permanently deleted and will not be obtained again.',
    422: 'When creating an object, a validation error occurred.',
    500: 'The server has an error, please check the server.',
    502: 'Gateway error.',
    503: 'The service is unavailable, the server is temporarily overloaded or maintained.',
    504: 'The gateway timed out.',
};
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
        message: `Request Error ${response.status}: ${response.url}`,
        description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

function requestAccessToken() {
    const options = {
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'POST',
    };
    return fetch('api/refresh', options);
}

function prepareFetchOptions(options) {
    const defaultOptions = {
        credentials: 'same-origin',
    };
    const newOptions = { ...defaultOptions, ...options };

    if (
        newOptions.method === 'POST' ||
        newOptions.method === 'PUT' ||
        newOptions.method === 'DELETE'
    ) {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        }
    }

    newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
    };

    return newOptions;
}

function retriableFetch(url, options, token, canRetry = true) {
    let authorizationHeader = {};
    if (token) {
        authorizationHeader = { Authorization: 'Bearer ' + token };
    }

    const newOptions = { ...options };
    newOptions.headers = {
        ...authorizationHeader,
        ...options.headers,
    };

    return fetch(url, newOptions)
        .then(checkStatus)
        .then(response => {
            if (newOptions.method === 'DELETE' || response.status === 204) {
                resolve(response.text());
            }
            const result = response.json();
            return result;
        })
        .catch(e => {
            const { dispatch } = store;
            const status = e.name;
            if (status === 401) {
                if (canRetry && token) {
                    /*
                    If accessToken is present and canRetry (calling login should not set canRetry=true), request new access token.
                    If refresh fails, do logout. If it succeeds, reinvoke the url.
                     */
                    return requestAccessToken()
                        .then(internalRes => {
                            if (internalRes) {
                                if (internalRes.status === 200) {
                                    return internalRes.json();
                                }
                                if (internalRes.status === 401) {
                                    // Refresh token expired or not login yet
                                    dispatch({
                                        type: 'login/logout',
                                    });
                                }
                            }
                        })
                        .then(result => {
                            const newToken = result.access_token;
                            setAccessToken(newToken);
                            return fetchAgain(url, options, newToken).then(result1 => {
                                return result1;
                            });
                        });
                }
            }
            if (status === 403) {
                dispatch(routerRedux.push('/exception/403'));
                return;
            }
            if (status <= 504 && status >= 500) {
                dispatch(routerRedux.push('/exception/500'));
                return;
            }
            if (status >= 404 && status < 422) {
                dispatch(routerRedux.push('/exception/404'));
            }
        });
}

function fetchAgain(url, options, token) {
    let authorizationHeader = {};
    if (token) {
        authorizationHeader = { Authorization: 'Bearer ' + token };
    }

    const newOptions = { ...options };
    newOptions.headers = {
        ...authorizationHeader,
        ...options.headers,
    };

    return fetch(url, newOptions)
        .then(checkStatus)
        .then(response => {
            if (newOptions.method === 'DELETE' || response.status === 204) {
                return response.text();
            }
            const result = response.json();
            return result;
        });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
    const newOptions = prepareFetchOptions(options);
    const accessToken = getAccessToken();
    return retriableFetch(url, newOptions, accessToken, false);
}

export function requestWithRetry(url, options) {
    const newOptions = prepareFetchOptions(options);
    const accessToken = getAccessToken();
    return retriableFetch(url, newOptions, accessToken);
}
