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

//como nos podemos dar cuenta aqui rompemos un poco con las reglas de Redux porque esta funcion no es pura
//para corregir esto se utilizara un middleware pero sera mas adelante
let indice=0;
const reducer =(state,action) => {
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

    return state;
};

const store=Redux.createStore(reducer, preloadedState);

let latestState;

const unsuscribe=store.subscribe(() => {

    let currentState=store.getState();
    if(currentState!=latestState){
        latestState=currentState;
        console.log("estado: ", currentState);
        renderTable(currentState.productos);
    }
    

})

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
                    <a title="Editar" href="#" onclick="onEdit(event)" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-pencil-square"></i>
                    </a> 
                
                    <a title="Eliminar" href="#" onclick="onDelete(event)" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                    </a> 
                </div>
            </td>
        `;
        return tr;
    });

    tbody.innerHTML="";//limpiando el tbody
    filas.forEach((tr)=>{
        tbody.appendChild(tr);
    });
    
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
        nombre: "prueba V2"
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