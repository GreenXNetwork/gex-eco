import { AUTH_LOGGED_IN } from './../actions/types';

const initialAuthState = {
    loggedIn: false,
    user: null
}

export const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case AUTH_LOGGED_IN:
            return {
                loggedIn: true,
                user: action.user
            };
        default:
            return state;
    }
};