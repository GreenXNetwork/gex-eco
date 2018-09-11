import { requestWithRetry } from '../utils/request';

export async function queryPortfolio() {
    return requestWithRetry('/api/portfolio');
}
