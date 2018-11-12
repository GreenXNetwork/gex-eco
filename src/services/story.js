import { requestWithRetry } from '../utils/request';

export async function queryProjectStory(projectId) {
    return requestWithRetry(`/api/projects/${projectId}/story`);
}
