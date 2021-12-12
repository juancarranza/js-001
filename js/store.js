/* ------------------------------Reducer y Store--------------------- */
//Aqui se coloca todo lo que tiene que ver con el manejo de los estados (Reducer)
//como nos podemos dar cuenta aqui rompemos un poco con las reglas de Redux porque esta funcion no es pura
//para corregir esto se utilizara un middleware pero sera mas adelante
let indice=0;
const reducer =(state,action) => {
    //Agregar
    if(action.type == "producto-agregado"){
        indice++;
        const producto=action.payload;
        const codigo=indice;
        const total=producto.cantidad*producto.precio;
        return {
            ...state,
            productos:[
                ...state.productos,
                {
                    ...producto,
                    codigo,
                    //total:total //esta linea es el equivalente a la linea de abajo, ya que la variable se llama igual a la propiedad
                    total
                }
            ]
        };
    }

    //Editar
    if(action.type=="producto-modificado"){
        
        const producto=action.payload;
        //la funcion slice() se puede utilizar para obtener el arreglo o parte del arreglo
        //en caso slice(1) esto obtiene el arreglo desde la segunda posicion
        //en caso slice(1,3) esto obtiene el arreglo desde la segunda posicion hasta la cuarta posicion
        const productos=state.productos.slice();//si no se le pone ningun parametro esto realiza una copia del arreglo
        const codigo = producto.codigo;
        const old=productos.find((item)=>item.codigo == codigo);
        const index=productos.indexOf(old);
        const total=producto.cantidad*producto.precio;

        productos[index]={
            ...producto,
            total
        };

        return{
            ...state,
            productos
        }
    }

    //Eliminar
    if(action.type=="producto-eliminado"){
        
        const producto=action.payload;
        const codigo = producto.codigo;
        const productos=state.productos.filter((item) => item.codigo!= codigo);
        return{
            ...state,
            productos    
        }
    }

    //Seleccionar (cuando se da click en el icono de Editar)
    if(action.type=="producto-seleccionado"){

        const codigo=action.payload.codigo;
        return{
            ...state,
            producto:state.productos.find(x=>x.codigo==codigo) || {}
        }
    }

    return state;
};

//Que es una Action Builder? No es mas que una funcion que va a tener el nombre del action que vamos a disparar
//Agregando un Action Builder
/*const productoSeleccionado=(codigo)=>{
    return {
        codigo: 1,
    }  
};*/
//Este metodo es equivalente a las 5 lineas de arriba 
const productoSeleccionado=(codigo)=>({
    type: "producto-seleccionado",
    payload:{ codigo }
});
//Eliminar producto
const productoEliminado=(codigo)=>({
    type:"producto-eliminado",
    payload: { codigo }
});

const productoModificado=(payload)=>({
    type:"producto-modificado",
    payload
});

const productoAgregado = (payload) => ({
    type:"producto-agregado",
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
const loggerMiddleware = store => next => action => {
    console.log("dispatching",action);
    const result=next(action);
    console.log("next sate",store.getState());
    return result;
}
