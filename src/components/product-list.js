import React from "react";

const ProductItem = (prop) => {
    const item = prop.item;
    const acciones = prop.acciones;
    return <tr>
        <td>{item.codigo}</td>
        <td>{item.nombre}</td>
        <td>{item.cantidad}</td>
        <td>{item.precio}</td>
        <td>{item.total}</td>
        <td>
            <div className="btn-group">
                <a 
                    title="Editar" 
                    href="#" 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => acciones.seleccionar(item.codigo)}
                    >
                    <i className="bi bi-pencil-square"></i>
                </a> 
            
                <a 
                    title="Eliminar" 
                    href="#" 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => acciones.eliminar(item.codigo)}
                    >
                    <i className="bi bi-trash"></i>
                </a> 
            </div>
        </td>
    </tr>;
}

const ProductList = () => {
    const productos = [
        {
            codigo: 1,
            nombre: "producto 1",
            cantidad: 10,
            precio: 11,
            total: 110
        
        }
    ];

    const seleccionar = (codigo) => {
        console.log('seleccionar: ', codigo);
    };

    const eliminar = (codigo) => {
        console.log('eliminar: ', codigo);
    };

    const acciones = {
        seleccionar,
        eliminar
    };

    const cantidadTotal=sum(productos, x=> x.cantidad);
    const precioTotal=sum(productos, x=> x.precio);
    const granTotal=sum(productos, x=> x.total);
 
    return <table className="table">
        <thead>
            <tr>
                <td>Codigo</td>
                <td>Nombre</td>
                <td>Cantidad</td>
                <td>Precio</td>
                <td>Total</td>
            </tr>
        </thead>
        <tbody>
            {productos.map(item => <ProductItem key={item.codigo} item = {item} acciones={acciones} />)} 
        </tbody>
        <tfoot>
            <tr>
                <td colSpan="2">Totales:</td>
                <td>{cantidadTotal}</td>
                <td>{precioTotal}</td>
                <td >{granTotal}</td>
            </tr>
        </tfoot>
    </table>
};

function sum(elementos,selector){
    return elementos
                .map(selector)
                .reduce((a,b) => a + b,0);
}

//export { ProductItem, ProductList};
export default ProductList;