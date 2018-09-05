import { stringify } from 'qs';
import { requestWithRetry } from '../utils/request';

/**
 *
 * @param {any} params {'project-type': 'all'}. NOT support operators like & or |. Support only ONE pair of key value.
 */
export async function queryProjects(params) {
    // /api/projects/?project-type=all
    // /api/projects/?project-type=profit-sharing
    // /api/projects/?category=solar
    return requestWithRetry(`/api/projects?${stringify(params)}`);
}
