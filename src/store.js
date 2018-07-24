import { createStore } from 'redux';
import rootReducer from "./reducers";

let store;
if (process.env.NODE_ENV === 'development') {
    store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
    store = createStore(rootReducer);
}

export default store;