import { requestWithRetry } from '../utils/request';

export async function queryAll() {
    return requestWithRetry('/api/projects');
}

