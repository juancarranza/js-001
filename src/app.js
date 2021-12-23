import React from "react";

const App = () => {
    return <main class="container">
        <form action="index.html">
            <input type="hidden" name="codigo" id="codigo" />
            <div class="mb-3"> 
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" name="nombre" id="nombre" class="form-control" />           
            </div>
            <div class="mb-3"> 
                <label for="cantidad"  class="form-label">Cantidad</label>
                <input type="number" name="cantidad" id="cantidad" class="form-control" />           
            </div>
            <div class="mb-3"> 
                <label for="precio"  class="form-label">Precio</label>
                <div class="input-group">
                    <span class="input-group-text">Q</span>
                    <input type="number" name="precio" id="precio" class="form-control" />
                </div>           
            </div>
            <div class="mb-3"> 
                <label for="categoria"  class="form-label">Precio</label>
                <select name="categoria" id="categoria" class="form-control">
                    <option value="1">Categoria 1</option>
                    <option value="2">Categoria 2</option>
                    <option value="3">Categoria 3</option>
                    <option value="4">Categoria 4</option>
                </select>
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>

    
        <table class="table">
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
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Totales:</td>
                    <td id="cantidad-total">0</td>
                    <td id="precio-total">0</td>
                    <td id="gran-total">0</td>
                </tr>
            </tfoot>
        </table>

   
    </main>
};