import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

let lastId=1;
let productos = [
   {
       nombre:"producto a",
       cantidad:1,
       precio:10,
       codigo: lastId
   }
];


app.use(cors());
app.use(bodyParser.json({type: 'application/json'}));
app.use(logs);

app.get("/", (req, res) => res.send("<h1> API de productos </h1>"));

app.get("/productos", (req, res) => {
   
    const filtro = req.query.filtro;
    if(filtro){
        res.json(productos.filter(p => p.nombre.indexOf(filtro) >= 0));
    }else{
        res.json(productos);
    }

    
});
app.post("/productos",(req, res) => {
    console.log("body: ", req.body);
    lastId++;
    const producto = {...req.body, codigo: lastId };
    productos.push(producto);
    res.status(201);
    res.json({producto});
});

// Get the information about one producto
app.get("/productos/:codigo", (req, res)=> {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p=>p.codigo==codigo);

    if(!producto){
        res.status(404);
        res.json({mensaje: "No existe ningun producto con el codigo: "+codigo });
    }else{
        res.status(200);
        res.json(producto);
    }
});

app.put("/productos/:codigo", (req, res)=> {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p=>p.codigo==codigo);

    if(!producto){
        res.status(404);
        res.json({mensaje: "No existe ningun producto con el codigo: "+codigo });
    }else{
        const index=productos.indexOf(producto);
        const nuevoProducto = productos[index]={...req.body, codigo};
        res.status(200);
        res.json(nuevoProducto);
    }
});

app.delete("/productos/:codigo", (req, res) => {
    const codigo = parseInt(req.params.codigo, 10);
    const producto = productos.find(p=>p.codigo==codigo);

    if(!producto){
        res.status(404);
        res.json({mensaje: "No existe ningun producto con el codigo: "+codigo });
    }else{
        productos=productos.filter(x => x != producto);
        const index=productos.indexOf(producto);
        delete productos[index];

        res.status(200);
        res.json({message: "Producto eliminado correctamente."});
    }
});

app.listen(5001, ()=>{
    console.log("Servidor express escuchando puerto 5001");
});

/* function isAuthenticated(req, res, next){
    
    const auth = req.headers.authorization;
    if(auth == "hola-mundo"){
        next();
    }else{
        res.status(401);
        res.send("Not authorized");
    }
} */

function logs(req, res, next){
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}