import {
    PROJECTS_HAVE_ERROR,
    PROJECTS_ARE_LOADING,
    PROJECTS_FETCH_DATA_SUCCESS
} from './types';
import UserService from "../../../../../../services/UserService";

export function projectsHaveError(bool) {
    return {
        type: PROJECTS_HAVE_ERROR,
        hasError: bool
    };
}

export function projectsAreLoading(bool) {
    return {
        type: PROJECTS_ARE_LOADING,
        isLoading: bool
    };
}

export function projectsFetchDataSuccess(projects) {
    return {
        type: PROJECTS_FETCH_DATA_SUCCESS,
        projects
    };
}

export function projectsFetchData() {
    return (dispatch) => {
        dispatch(projectsAreLoading(true));

        UserService.getAllUsers()
            .then(
                (response) => {
                    if (response.status !== 200) {
                        throw Error(response.statusText);
                    }

                    dispatch(projectsAreLoading(false));

                    return response;
                }
            ).then(
                (response) => dispatch(projectsFetchDataSuccess(response.data))
            ).catch(
                () => dispatch(projectsHaveError(true))
            );
    };
}