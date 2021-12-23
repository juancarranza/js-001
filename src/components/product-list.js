import React from "react";

const ProductItem = (prop) => {
    const item = prop.item;
    return <tr>
        <td>{item.codigo}</td>
        <td>{item.nombre}</td>
        <td>{item.cantidad}</td>
        <td>{item.precio}</td>
        <td>{item.total}</td>
        <td>
            <div className="btn-group">
                <a title="Editar" href="#" className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-pencil-square"></i>
                </a> 
            
                <a title="Eliminar" href="#" className="btn btn-sm btn-outline-danger">
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
            {productos.map(item => <ProductItem key={item.codigo} item = {item}  />)} 
        </tbody>
        <tfoot>
            <tr>
                <td colSpan="2">Totales:</td>
                <td id="cantidad-total">0</td>
                <td id="precio-total">0</td>
                <td id="gran-total">0</td>
            </tr>
        </tfoot>
    </table>
};

export default ProductList;