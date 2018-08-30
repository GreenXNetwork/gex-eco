import store from '../index';

const CURRENT_TOKEN = {
    accessToken: undefined,
    timestamp: undefined,
};

function saveToken(token) {
    localStorage.setItem('tkn', JSON.stringify(token));
}

function loadToken() {
    const tknStr = localStorage.getItem('tkn');
    const token = JSON.parse(tknStr);
    if (token) {
        CURRENT_TOKEN.accessToken = token.accessToken;
        CURRENT_TOKEN.timestamp = token.timestamp;
    }
}

loadToken();

window.addEventListener(
    'storage',
    storageEvent => {
        if (storageEvent.storageArea === localStorage && storageEvent.key === 'tkn') {
            const tkn = JSON.parse(storageEvent.newValue);
            if (tkn.accessToken === null) {
                //
                CURRENT_TOKEN.accessToken = tkn.accessToken;
                CURRENT_TOKEN.timestamp = tkn.timestamp;

                const { dispatch } = store;
                dispatch({ type: 'login/logout' });
            }
        }
    },
    false
);

export function setAccessToken(accessToken) {
    if (CURRENT_TOKEN.accessToken !== accessToken) {
        CURRENT_TOKEN.accessToken = accessToken;
        CURRENT_TOKEN.timestamp = Date.now();
        saveToken(CURRENT_TOKEN);
    }
}

export function getAccessToken() {
    return CURRENT_TOKEN.accessToken;
}
