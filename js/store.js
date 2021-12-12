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