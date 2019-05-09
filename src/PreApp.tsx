/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from 'react';
import App from "./App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer, {initialState} from "./services/rootReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(rootReducer, {root: initialState} as any, composeWithDevTools());


export default class PreApp extends Component {

    render() {
        return <Provider store={store}>
            <App/>
        </Provider>
    }
}

