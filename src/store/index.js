import { applyMiddleware, createStore } from "redux";
import * as $store from "./store";
/* ----------------Eventos-------------- */
//usando sessionStorage
//const savedState = sessionStorage.getItem("state");//buscamos en el session storage si existe (RAM)
const savedState = localStorage.getItem("state");//buscamos en el local storage si existe(disco duro)
console.log('savedSte',savedState);
const deserialized = savedState && JSON.parse(savedState);//en caso de que existe hace un JSON.parse
console.log('desearilized', deserialized);
const preloadedState = deserialized || {
    producto:{},
    productos:[]
};

const middlewares = applyMiddleware(
    $store.loggerMiddleware,
    $store.addEditProductoMiddleware,
    $store.generadorCodigoProductoBuilder(0),
    $store.storageMiddleware,
);
const store = createStore($store.reducer, preloadedState, middlewares);

export default store;