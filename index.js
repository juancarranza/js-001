const form= document.getElementsByTagName("form")[0];//nos da una coleccion de elementos por si existen varios formularios en la pagina.
const tbody=document.getElementsByTagName("tbody")[0];
const tdCantidadTotal=document.getElementById("cantidad-total");
const tdPreciosTotales=document.getElementById("precio-total");
const tdGranTotal=document.getElementById("gran-total");
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


let indice=0;
let cantidadTotal=0;
let preciosTotales=0;
let granTotal=0;
let currentRow;

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
    
    let codigo=frmCodigo[1];
    const nombre = frmNombre[1];
    const cantidad=frmCantidad[1];
    const precio=frmPrecio[1];
    const categoria=frmCategoria[1];
    const total = cantidad * precio;
    //indice=indice+1; sentencia es lo mismo que la linea de abajo
    
    
    
    cantidadTotal=parseFloat(cantidad)+cantidadTotal;
    preciosTotales=parseFloat(precio)+preciosTotales;
    granTotal=parseFloat(total)+granTotal;

    let tr;

    if(!codigo){//if codigo is not defined, is not null
        indice++;
        codigo=indice;
        tr=document.createElement("tr");
        tbody.appendChild(tr);
    }else{
        tr=currentRow;
    }

    
    tr.dataset.categoria=categoria;

    console.log("cantidadTotal:"+cantidadTotal);
    console.log("preciosTotales: "+preciosTotales);
    console.log("granTotal: "+granTotal);
    /* tr.innerHTML="<td>x</td><td>"
    + nombre + "</td><td>"
    + cantidad + "</td><td>"
    + precio + "</td><td>"
    + 0 +'</td><td><a href="#">Editar</a> | <a href="#">Eliminar</a> </td>'; */
    //string interpolation and literals
    tr.innerHTML=`
        <td>${codigo}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        </td><td><a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onclick="onDelete(event)">Eliminar</a> </td>
    `;
    //tbody.appendChild(tr);
    
    tdCantidadTotal.innerHTML=cantidadTotal;
    tdPreciosTotales.innerHTML=preciosTotales;
    tdGranTotal.innerHTML=granTotal;
    
    form.reset();//clean the html form everytime the person click on the Guardar Btn
    inputName.focus();
    console.log(nombre);
    console.log(cantidad);
    console.log(precio);
    console.log(categoria);


}

/** 
 * @param {Event} event
*/
function onEdit(event){
    console.log("on edit");
    event.preventDefault();

    /** @type {HTMLAnchorElement} */
    const anchor=event.target;//referencia al elemento html <td><a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onclick="onDelete(event)">Eliminar</a> </td>
    console.log(anchor.parentElement); 

    const tr=anchor.parentElement.parentElement; //obtenemos el elemento html <tr><td><a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onclick="onDelete(event)">Eliminar</a> </td></tr>
    const celdas = tr.getElementsByTagName("td");//separamos el elemento <tr> por cada <td>
    const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas;

    inputCodigo.value=tdCodigo.innerText;
    inputName.value=tdNombre.innerText;
    inputCantidad.value=tdCantidad.innerText;
    inputPrecio.value=tdPrecio.innerText;
    selectCategoria.value=tr.dataset.categoria;
    
    currentRow=tr;
    //console.log(celdas);


}


/**
 * 
 * @param {Event} event 
 */
function onDelete(event){
    console.log("on delete");
    event.preventDefault();

    /** @type {HTMLAnchorElement} */
    const anchor=event.target;//referencia al elemento html  <a href="#" onclick="onDelete(event)">Eliminar</a> 
    const tr=anchor.parentElement.parentElement; //obtenemos el elemento html <tr><td><a href="#" onclick="onEdit(event)">Editar</a> | <a href="#" onclick="onDelete(event)">Eliminar</a> </td></tr>
    
    tbody.removeChild(tr);
    console.log(anchor.parentElement.parentElement); 
}