/* ------------------------------Reducer y Store--------------------- */
//Aqui se coloca todo lo que tiene que ver con el manejo de los estados (Reducer)
//como nos podemos dar cuenta aqui rompemos un poco con las reglas de Redux porque esta funcion no es pura
const ActionTypes={
    ProductoAgregado: "producto-agregado",
    ProductoModificado: "producto-modificado",
    ProductoEliminado: "producto-eliminado",
    ProductoSeleccionado: "producto-seleccionado",
    ProductoAgregadoModificado: "producto-add-edit"  
};

export const reducer =(state,action) => {

    switch(action.type){
        case ActionTypes.ProductoAgregado:
                return productoAgregadoReducer(state,action);

        case ActionTypes.ProductoModificado:
                return productoModificadoReducer(state,action);
            
        case ActionTypes.ProductoEliminado:
                return productoEliminadoReducer(state, action);
            
        case ActionTypes.ProductoSeleccionado:
                return productoSeleccionadoReducer(state, action);
            
        default:
            return state;
    }


};//end reducer

//Que es una Action Builder? No es mas que una funcion que va a tener el nombre del action que vamos a disparar
//Agregando un Action Builder
/*const productoSeleccionado=(codigo)=>{
    return {
        codigo: 1,
    }  
};*/
//Este metodo es equivalente a las 5 lineas de arriba 
export const productoSeleccionado=(codigo)=>({
    type: ActionTypes.ProductoSeleccionado,
    payload:{ codigo }
});
//Eliminar producto
export const productoEliminado=(codigo)=>({
    type: ActionTypes.ProductoEliminado,
    payload: { codigo }
});

export const productoModificado=(payload)=>({
    type: ActionTypes.ProductoModificado,
    payload
});

export const productoAgregado = (payload) => ({
    type:ActionTypes.ProductoAgregado,
    payload
});

export const addEditProducto =(payload) => ({
    type: ActionTypes.ProductoAgregadoModificado,
    payload
});

/* Redux y Middlewares
Los Middlewares son un concepto bastante poderoso en Redux, porque nos van a permitir modificar la logica de nuestra aplicacion,
o agregarle funcionalidad a la misma sin tener que modificar tanto el codigo. Es como que esto nos permite utilizar/agregar plugins a nuestra aplicacion.

Un Middleware nos es mas que una funcion

*/

/* function loggerMiddleware(store){
    return function dispatchWrapper(next){//El wrapper encierra todas las llamadas que nosotros hagamos al dispatch que hagamos
                                          //por ejemplo por cada una de los eventos que tenemos en el app.js (store.dispatch(productoEliminado(codigo)),store.dispatch(productoAgregado(producto)))
                                          //next es una funcion que nosotros llamamos cuando queremos que se ejecute el action original, el dispatchWrapper devuelve otra funcion
        return function actionHandler(action){
            console.log("dispatching",action);
            const result=next(action);
            console.log("next sate",store.getState());
            return result;
        }
    }
} */
//esto es equivalente al Middleware de arriba solo que se utilizo arrow function
export const loggerMiddleware = store => next => action => {
    console.log("dispatching",action);
    const result=next(action);
    console.log("next sate",store.getState());
    return result;
}

export const addEditProductoMiddleware = store => next => action => {
    if(action.type!=ActionTypes.ProductoAgregadoModificado){
        return next(action);
    }
    const producto=action.payload;
    /*let actionToDispatch;
     //Condition to validate if this is Edit action or if we are adding an item 
     if(producto.codigo){
        
        actionToDispatch=productoModificado(producto);
    }else{
        actionToDispatch=productoAgregado(producto);
    }
    */ //esta linea es un if ternario que es lo mismo que en las 8 lineas de arriba
    const actionToDispatch=producto.codigo ? productoModificado(producto) : productoAgregado(producto);
     //Condition to validate if this is Edit action or if we are adding an item 
    store.dispatch(actionToDispatch);
    //clear the form and the state
    return store.dispatch(productoSeleccionado(null));
}

function productoSeleccionadoReducer( state, action) {
    const codigo=action.payload.codigo;
    return{
        ...state,
        producto:state.productos.find(x=>x.codigo==codigo) || {}
    }
}

function productoEliminadoReducer( state, action) {
    const producto = action.payload;
    const codigo = producto.codigo;
    const productos = state.productos.filter((item) => item.codigo != codigo);
    return {
        ...state,
        productos
    };
}

function productoModificadoReducer(state, action) {
    const producto = action.payload;
    //la funcion slice() se puede utilizar para obtener el arreglo o parte del arreglo
    //en caso slice(1) esto obtiene el arreglo desde la segunda posicion
    //en caso slice(1,3) esto obtiene el arreglo desde la segunda posicion hasta la cuarta posicion
    const productos = state.productos.slice(); //si no se le pone ningun parametro esto realiza una copia del arreglo
    const codigo = producto.codigo;
    const old = productos.find((item) => item.codigo == codigo);
    const index = productos.indexOf(old);
    const total = producto.cantidad * producto.precio;

    productos[index] = {
        ...producto,
        total
    };

    return {
        ...state,
        productos
    };
}

function productoAgregadoReducer(state, action) {
    const producto = action.payload;
    const total = producto.cantidad * producto.precio;
    return {
        ...state,
        productos: [
            ...state.productos,
            {
                ...producto,
                //total:total //esta linea es el equivalente a la linea de abajo, ya que la variable se llama igual a la propiedad
                total
            }
        ]
    };
}

//middleWare para eliminar la variable global indice
export function generadorCodigoProductoBuilder(codigoInicial){
    
    let codigo=codigoInicial;
    return store => next => action => {
        if(action.type!=ActionTypes.ProductoAgregado){
            return next(action);
        }
        
        codigo++;
        const actionToDispath ={
            ...action,
            payload:{
                ...action.payload,
                codigo
            }
        };
        //action.payload={...action.payload, codigo};//esta no es una buena practica porque estaba modificando el parametro action en vez de crear una copia del mismo 
        return next(actionToDispath);
    };
}
