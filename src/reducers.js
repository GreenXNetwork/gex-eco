import { combineReducers } from "redux";
import { authReducer } from './services/auth/authReducer';
import localeReducer from './services/locale/localeReducer';
import { reducer as projectExplorerPageReducer } from './scenes/ProjectExplorerPage/ProjectExplorerPageReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    locale: localeReducer,
    ProjectExplorerPage: projectExplorerPageReducer
});

export default rootReducer;