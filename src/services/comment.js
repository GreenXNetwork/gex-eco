import { requestWithRetry } from '../utils/request';

export async function queryMoreComments(projectId, skip, size) {
    return requestWithRetry(`/api/projects/${projectId}/comments?skip=${skip}&size=${size}`);
}

export async function queryMoreReplies(projectId, commentId, skip, size) {
    return requestWithRetry(
        `/api/projects/${projectId}/comments/${commentId}/replies?skip=${skip}&size=${size}`
    );
}
