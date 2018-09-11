import { requestWithRetry } from '../utils/request';

export async function queryOwner(ownerId) {
    return requestWithRetry(`/api/owners/${ownerId}`);
}
