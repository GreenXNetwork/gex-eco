import {
    combineReducers
} from 'redux';
import {
    PROJECTS_HAVE_ERROR,
    PROJECTS_ARE_LOADING,
    PROJECTS_FETCH_DATA_SUCCESS
} from './types';

function projectsHaveError(state = false, action) {
    switch (action.type) {
        case PROJECTS_HAVE_ERROR:
            return action.hasError;
        default:
            return state;
    }
}

function projectsAreLoading(state = false, action) {
    switch (action.type) {
        case PROJECTS_ARE_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

function projects(state = [], action) {
    switch (action.type) {
        case PROJECTS_FETCH_DATA_SUCCESS:
            return action.projects;
        default:
            return state;
    }
}

export const reducer = combineReducers({
    projects,
    projectsHaveError,
    projectsAreLoading
});