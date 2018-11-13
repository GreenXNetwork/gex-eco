import { requestWithRetry } from '../utils/request';

export async function queryMoreUpdates(projectId, skip, size) {
    return requestWithRetry(`/api/projects/${projectId}/updates?skip=${skip}&size=${size}`);
}
