import { combineReducers } from "redux";
import { authReducer } from './services/auth/authReducer';
import localeReducer from './services/locale/localeReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    locale: localeReducer
});

export default rootReducer;