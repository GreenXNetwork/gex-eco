import { requestWithRetry } from '../utils/request';

export async function query() {
    return requestWithRetry('/api/users');
}

export async function queryCurrent() {
    return requestWithRetry('/api/user');
}
