/* ----------------Eventos-------------- */
const preloadedState={
    producto:{},
    productos:[]
};

const middlewares = Redux.applyMiddleware(loggerMiddleware);
const store=Redux.createStore(reducer, preloadedState, middlewares);

let latestState;

store.subscribe(() => {

    let currentState=store.getState();
    if(currentState!=latestState){
        latestState=currentState;
        ui.renderForm(currentState.producto);
        ui.renderTable(currentState.productos);
    }
    
});

ui.onFormSubmit = (producto) =>{
    //Condition to validate if this is Edit action or if we are adding an item 
    if(producto.codigo){
        store.dispatch(productoModificado(producto));
    }else{
        store.dispatch(productoAgregado(producto));
    }
    //clear the form and the state
    store.dispatch(productoSeleccionado(null));
}

/* ui.onEliminarClick=(codigo)=>{
    store.dispatch(productoEliminado(codigo));
}
 */
//esta linea es equivalente a las 3 lineas de arriba
ui.onEliminarClick= (codigo) => store.dispatch(productoEliminado(codigo));

//a esta linea se cambio de igual manera a como estaba de la siguiente manera
ui.onEditarClick= (codigo) => store.dispatch(productoSeleccionado(codigo));

/*
ui.sum=(elementos,selector)=>{
    return elementos
        .map(selector)
        .reduce((a,b) => a + b,0);
}*/