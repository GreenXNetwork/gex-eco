import { requestWithRetry } from '../utils/request';

/**
 *
 * @param {any} projectId The id of project.
 */
export async function queryInvestorsByProject(projectId, skip, size) {
    return requestWithRetry(`/api/projects/${projectId}/investors?skip=${skip}&size=${size}`);
}
