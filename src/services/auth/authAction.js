import { AUTH_LOGGED_IN, AUTH_LOGGED_OUT } from './../actions/types';

export const setLoggedIn = (user) => ({
    type: AUTH_LOGGED_IN,
    user
});

export const setLoggedOut = () => ({
    type: AUTH_LOGGED_OUT
});