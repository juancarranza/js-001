
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import store from "./store"


const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
);
/**
 * Instalacion de libreria para que haga la conexion entre React y Redux
 * npm install --save react-redux
 */

  