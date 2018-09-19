import { requestWithRetry } from '../utils/request';

export async function query(userId, lang) {
    return requestWithRetry(`/api/users/${userId}?lang=${lang}`);
}
