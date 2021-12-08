/** @type {HTMLInputElement} */
const inputCodigo=document.getElementById("codigo");
/** @type {HTMLInputElement} */
const inputName=document.getElementById("nombre");
/** @type {HTMLInputElement} */
const inputCantidad=document.getElementById("cantidad");
/** @type {HTMLInputElement} */
const inputPrecio=document.getElementById("precio");
/** @type {HTMLSelectElement} */
const selectCategoria=document.getElementById("categoria");
const form= document.getElementsByTagName("form")[0];//nos da una coleccion de elementos por si existen varios formularios en la pagina.
const tbody=document.getElementsByTagName("tbody")[0];
const tdCantidadTotal=document.getElementById("cantidad-total");
const tdPreciosTotales=document.getElementById("precio-total");
const tdGranTotal=document.getElementById("gran-total");

const preloadedState={
    producto:{},
    productos:[]
};

//function para evitar cambiar la operacion en dos lugares distintos. Pendiente por hacer

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

const store=Redux.createStore(reducer, preloadedState);

let latestState;

const unsuscribe=store.subscribe(() => {

    let currentState=store.getState();
    if(currentState!=latestState){
        latestState=currentState;
        console.log("estado: ", currentState);
        renderForm(currentState.producto);
        renderTable(currentState.productos);
    }
    

});

//tip: los metodos que dibujan algo en el html usan el prefijo "render"
function renderTable(productos){
     
    const filas=productos.map((item)=>{
        const tr=document.createElement("tr"); 
        tr.innerHTML=`
            <td>${item.codigo}</td>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td>${item.total}</td>
            <td>
                <div class="btn-group">
                    <a title="Editar" href="#" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-pencil-square"></i>
                    </a> 
                
                    <a title="Eliminar" href="#" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                    </a> 
                </div>
            </td>
        `;

        //***inicio funcion Eliminar***
        /*         
        const links=tr.getElementsByTagName("a");
        const editar=links[0];
        const eliminar=links[1]; */
        //esta linea es lo mismo que las tres de arriba
        const [editar, eliminar]=tr.getElementsByTagName("a");

        eliminar.addEventListener("click",(event)=>{
            event.preventDefault();
            store.dispatch({
                type:"producto-eliminado",
                payload:{
                    codigo:item.codigo
                }
            });
        });
        //***fin funcion Eliminar***
        
        //***inicio funcion Editar***/
        editar.addEventListener("click",(event)=>{
            event.preventDefault();
            store.dispatch({
                type:"producto-seleccionado",
                payload:{
                    codigo:item.codigo
                    /* nombre: item.nombre,
                    cantidad: item.cantidad,
                    precio: item.precio,
                    categoria: item.categoria */
                }
            });
        });
        //***inicio funcion Editar***/
        return tr;
    });

    tbody.innerHTML="";//limpiando el tbody
    filas.forEach((tr)=>{
        tbody.appendChild(tr);
    });

    //funcion map() genera en este caso un arreglo de cantidades
    //funcion reduce((a,b)=> a+b, 0) va realizando la suma de los elementos del arreglo, va sumando el primer elemento del arreglo, mas el siguiente y asi. 
    //Por lo que se le debe de indicar un valor inicial en este caso es 0 para que no haya error al ejecutarlo.
    /* const cantidadTotal=productos
        .map(x=>x.cantidad)
        .reduce((a,b) => a + b, 0); */
    const cantidadTotal=sum(productos,x=>x.cantidad);//esta es equivalente a las tres lineas que estan arriba
    
    /* const precioTotal=productos
        .map(x=>x.precio)
        .reduce((a,b) => a + b, 0);
     */
    const precioTotal=sum(productos,x=>x.precio);//esta es equivalente a las tres lineas que estan arriba

    /* const granTotal=productos
        .map(x=>x.total)
        .reduce((a,b) => a + b, 0); */
    const granTotal=sum(productos,x=>x.total);//esta es equivalente a las tres lineas que estan arriba
    
    tdCantidadTotal.innerText=cantidadTotal;
    tdPreciosTotales.innerText=precioTotal;
    tdGranTotal.innerText=granTotal;

    //en javascript se pueden crear funciones dentro de una funcion
    function sum(elementos,selector){
        return elementos
                    .map(selector)
                    .reduce((a,b) => a + b,0);
    }
    
}
//siguiendo el tip, este dibuja los datos del dato a Editar
function renderForm(producto){

    inputCodigo.value = producto.codigo || "";
    inputName.value = producto.nombre || "";
    inputCantidad.value = producto.cantidad || "";
    inputPrecio.value = producto.precio || "";
    selectCategoria.value = producto.categoria || 1;
}

store.dispatch({
    type:"producto-agregado",
    payload: {
        nombre: "prueba A",
        cantidad: 3,
        precio: 10,
        categoria:2
    }
});

store.dispatch({
    type:"producto-modificado",
    payload: {
        codigo: 1,
        nombre: "prueba aV2",
        cantidad: 4,
        precio: 11,
        categoria:1
    }
});
store.dispatch({
    type:"producto-agregado",
    payload: {
        nombre: "prueba B",
        cantidad: 6,
        precio: 8,
        categoria:3
    }
});

//unsuscribe();//evitar la suscripcion

store.dispatch({
    type:"producto-agregado",
    payload: {
        nombre: "prueba C",
        cantidad: 2,
        precio: 4,
        categoria:4
    }
});
//console.log(store);

store.dispatch({
    type:"producto-eliminado",
    payload: {
        codigo:2
    }

});

form.addEventListener("submit",onSubmit);

/** 
 * @param {Event} event
*/
function onSubmit(event){
    
    event.preventDefault();//funcion que evita que el evento por default, ignore la accion the submit que tiene el html (submit). Se evita que el formulario se redirecciona a otra pagina
    
    const data = new FormData(form);//get data from the form element (<html form>)
    const values = Array.from(data.entries());//convert the object FormData  to an array object, the array has the following structure
    /*
        0: ['nombre','Pantalon(value that we type in the input)'] -> reference to => the following html tag <input type="text" name="nombre" id="nombre">    
        1: ['cantidad','100']
    */   

    /* 
    const nombre=values[0][1];
    const cantidad=values[1][1];
    const precio=values[2][1];
    const categoria=values[3][1];
    //esta solucion es lo mismo que esta en las siguientes 5 lineas de codigo
    */
    const [frmCodigo,frmNombre,frmCantidad, frmPrecio, frmCategoria] = values;
    
    const codigo=parseInt(frmCodigo[1]);
    const nombre = frmNombre[1];
    const cantidad=parseFloat(frmCantidad[1]);
    const precio=parseFloat(frmPrecio[1]);
    const categoria=parseInt(frmCategoria[1]);

    //Condition to validate if this is Edit action or if we are adding an item 
    if(codigo){
        store.dispatch({
            type:"producto-modificado",
            payload:{
                codigo,
                nombre,
                cantidad,
                precio,
                categoria
            }
        });

    }else{
        store.dispatch({
            type:"producto-agregado",
            payload:{
                nombre,
                cantidad,
                precio,
                categoria
            }
        });
    }
    //clear the form and the state
    store.dispatch({
        type:"producto-seleccionado",
        payload:{
            codigo:null
        }
    });
}