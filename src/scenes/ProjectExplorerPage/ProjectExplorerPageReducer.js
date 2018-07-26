import { combineReducers } from "redux";

import { reducer as projectContainerReducer } from "./components/ProjectContainer/services/projects/reducer";

export const reducer = combineReducers({
	ProjectContainer: projectContainerReducer
});
