const ui={
    
    onFormSubmit:(data)=>{},
    onEliminarClick:(codigo)=>{},
    onEditarClick:(codigo)=>{},
    //sum:(elementos,selecto)=>{},
    renderForm,
    renderTable
};

const inputCodigo=document.getElementById("codigo");
const inputName=document.getElementById("nombre");
const inputCantidad=document.getElementById("cantidad");
const inputPrecio=document.getElementById("precio");
const selectCategoria=document.getElementById("categoria");
const form= document.getElementsByTagName("form")[0];//nos da una coleccion de elementos por si existen varios formularios en la pagina.
const tbody=document.getElementsByTagName("tbody")[0];
const tdCantidadTotal=document.getElementById("cantidad-total");
const tdPreciosTotales=document.getElementById("precio-total");
const tdGranTotal=document.getElementById("gran-total");

form.addEventListener("submit", (event) => {
    event.preventDefault();//funcion que evita que el evento por default, ignore la accion the submit que tiene el html (submit). Se evita que el formulario se redirecciona a otra pagina

    const data = new FormData(form);//get data from the form element (<html form>)
    const values = Array.from(data.entries());//convert the object FormData  to an array object, the array has the following structure
    /*
        0: ['nombre','Pantalon']  ([1]=value that we type in the input)-> reference to => the following html tag <input type="text" name="nombre" id="nombre">    
        1: ['cantidad','100']
    */   
    const [frmCodigo,frmNombre,frmCantidad, frmPrecio, frmCategoria] = values;
    /** frmCodigo=value[0], frmNombre=value[1], ... */
    const codigo=parseInt(frmCodigo[1]);
    const nombre = frmNombre[1];
    const cantidad=parseFloat(frmCantidad[1]);
    const precio=parseFloat(frmPrecio[1]);
    const categoria=parseInt(frmCategoria[1]);

    ui.onFormSubmit({
        codigo,
        nombre,
        cantidad,
        precio,
        categoria
    });

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
            ui.onEliminarClick(item.codigo);
        });
        //***fin funcion Eliminar***
        
        //***inicio funcion Editar***/
        editar.addEventListener("click",(event)=>{
            event.preventDefault();
            ui.onEditarClick(item.codigo);
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

