import { applyMiddleware, createStore } from "redux";
import * as $store from "./store";
/* ----------------Eventos-------------- */
const preloadedState={
    producto:{},
    productos:[]
};

const middlewares = applyMiddleware(
    $store.loggerMiddleware,
    $store.addEditProductoMiddleware,
    $store.generadorCodigoProductoBuilder(0)
);
const store = createStore($store.reducer, preloadedState, middlewares);

export default store;