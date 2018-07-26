import {
    applyMiddleware,
    createStore,
    compose
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore(initialState) {
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk)
    );

    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}