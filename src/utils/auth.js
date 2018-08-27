const CURRENT_TOKEN = {
    accessToken: undefined,
    timestamp: undefined,
};
export function setAccessToken(accessToken, timestamp) {
    CURRENT_TOKEN.accessToken = accessToken;
    CURRENT_TOKEN.timestamp = timestamp;
    saveToken(CURRENT_TOKEN);
}

export function getAccessToken() {
    return CURRENT_TOKEN.accessToken;
}

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

window.addEventListener(
    'storage',
    storageEvent => {
        if (storageEvent.storageArea === localStorage && storageEvent.key === 'tkn') {
            alert('tkn = ' + JSON.stringify(storageEvent.newValue));
        }
    },
    false
);

loadToken();
