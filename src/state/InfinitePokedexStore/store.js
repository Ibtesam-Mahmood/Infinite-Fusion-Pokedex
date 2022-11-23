import { applyMiddleware } from "redux";
import { configureStore  } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';
import ThunkMiddleware from "redux-thunk";
import PokemonStoreState from "./state";

// const devToolOptions = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&  
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     });

// const composeEnhancers = composeWithDevTools(devToolOptions);

// const enhancer = composeEnhancers(
//     applyMiddleware(ThunkMiddleware)
// )

const store = configureStore({reducer: PokemonStoreState, middleware: [ThunkMiddleware]});

export default store;