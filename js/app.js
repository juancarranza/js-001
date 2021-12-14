/* ----------------Eventos-------------- */
const preloadedState={
    producto:{},
    productos:[]
};

const middlewares = Redux.applyMiddleware(
    loggerMiddleware,
    addEditProductoMiddleware,
    generadorCodigoProductoBuilder(0)
);
const store=Redux.createStore(reducer, preloadedState, middlewares);

/*
store.subscribe(() => {

    let currentState=store.getState();
    if(currentState!=latestState){
        latestState=currentState;
        ui.renderForm(currentState.producto);
        ui.renderTable(currentState.productos);
    }
    
});*/

store.subscribe(dispatchOnChange(store, (state) => {
    ui.renderForm(state.producto);
    ui.renderTable(state.productos);
    }
));

/*ui.onFormSubmit = (producto) =>{
    store.dispatch(addEditProducto(producto));
}*/
ui.onFormSubmit = (producto) => store.dispatch(addEditProducto(producto));
//en arrow functions los parentesis  no son requeridos si solo hay un parametro, Ejemplo:
//ui.onFormSubmit = producto => store.dispatch(addEditProducto(producto));

/* ui.onEliminarClick=(codigo)=>{
    store.dispatch(productoEliminado(codigo));
}
 */
//esta linea es equivalente a las 3 lineas de arriba
ui.onEliminarClick= (codigo) => store.dispatch(productoEliminado(codigo));

//a esta linea se cambio de igual manera a como estaba de la siguiente manera
ui.onEditarClick= (codigo) => store.dispatch(productoSeleccionado(codigo));

function dispatchOnChange(store, dispatch){
    let latestState;
    return function(){
        let currentState=store.getState();
        if(currentState!=latestState){
            latestState=currentState;
            dispatch(currentState);
        }
    }
}
/*
ui.sum=(elementos,selector)=>{
    return elementos
        .map(selector)
        .reduce((a,b) => a + b,0);
}*/