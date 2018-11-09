import { requestWithRetry } from '../utils/request';

export async function queryMoreComments(projectId, skip, size) {
    return requestWithRetry(`/api/projects/${projectId}/comments?skip=${skip}&size=${size}`);
}

export async function queryMoreReplies(projectId, commentId, skip, size) {
    return requestWithRetry(
        `/api/projects/${projectId}/comments/${commentId}/replies?skip=${skip}&size=${size}`
    );
}

export async function createComment(projectId, commentId, userId, comment) {
    const data = {
        user_id: userId,
        comment,
        project_id: projectId,
        parent_id: commentId,
    };
    return requestWithRetry(`/api/projects/${projectId}/comments`, {
        method: 'POST',
        body: data,
    });
}
