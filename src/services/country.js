import { requestWithRetry } from '../utils/request';

export async function queryList() {
    return requestWithRetry('/api/countries');
}
