import { requestWithRetry } from '../utils/request';

/**
 *
 * @param {any} projectId The id of project.
 */
export async function queryInvestorsByProject(projectId) {
    return requestWithRetry(`/api/projects/${projectId}/investors`);
}
